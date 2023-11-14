const express = require("express");
const router = express.Router();
const { Users, Posts, sequelize } = require("../models");
const authmiddleware = require("../middlewares/auth_middleware");
const { Op } = require("sequelize");
const url = require("url");

// 상품 등록 API
router.post("/posts", authmiddleware, async (req, res) => {
    const { title, content, price } = req.body;
    const { userId } = res.locals.user;

    if (!title || !content || !price) {
        return res.status(400).json({ errorMessage: "형식이 올바르지 않습니다." });
    }
    await Posts.create({
        UserId: userId,
        title,
        content,
        price,
    });
    return res.status(200).json({ message: "판매 상품을 등록하였습니다." });
});

// 상품 목록 조회 API
router.get("/posts", async (req, res) => {
    let urlData = req.url;
    let queryData = url.parse(urlData, true).query;
    let sortSTR = String(queryData.sort);
    try {
        let val = "desc";

        if (sortSTR.toLowerCase() === "asc") {
            val = "asc";
        } else if (sortSTR.toLowerCase() === "desc" || sortSTR === null) {
            val;
        } else {
            return res.status(400).json({ errorMessage: "잘못된 경로 입니다." });
        }

        const allPosts = await Posts.findAll({
            attributes: [
                "productId",
                "title",
                "status",
                "price",
                "createdAt",
                "updatedAt",
                [sequelize.col("nickname"), "nickname"],
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
            ],
            order: [["createdAt", val]],
        });
        return res.status(200).json({ allPosts });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ errorMessage: "작성된 글이 없습니다." });
    }
});

// 상품 상세 조회 API
router.get("/post/:productid", async (req, res) => {
    const productid = req.params.productid;
    try {
        const postOne = await Posts.findOne({
            attributes: [
                "productId",
                "title",
                "content",
                "status",
                "price",
                "createdAt",
                "updatedAt",
                [sequelize.col("nickname"), "nickname"],
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
            ],
            where: { productid },
        });
        return res.status(200).json(postOne);
    } catch (error) {
        res.status(400).json({ errorMessage: "상세 목록 조회 실패!" });
    }
});

// 상품 수정 API
router.put("/post/:productid", authmiddleware, async (req, res) => {
    const productid = req.params.productid;
    const { title, content, status, price } = req.body;
    const { userId } = res.locals.user;
    const postOne = await Posts.findOne({ where: { productid } });
    try {
        if (!postOne) {
            return res.status(404).json({ errorMessage: "상품 조회에 실패하였습니다" });
        } else if (postOne.UserId !== userId) {
            return res.status(400).send({ errorMessage: "수정 할 권한이 없습니다." });
        } else if (!title || !content || !status || !price) {
            return res.status(400).send({ errorMessage: "데이터 형식이 올바르지 않습니다." });
        } else {
            const insertOne = {
                title,
                content,
                status,
                price,
            };
            await Posts.update(insertOne, {
                where: { [Op.and]: [{ productid }, { UserId: userId }] },
            });
            res.status(200).send({ message: "상품 정보 수정 완료" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errorMessage: "상품 조회에 실패하였습니다." });
    }
});

// 상품 삭제 API
router.delete("/post/:productid", authmiddleware, async (req, res) => {
    try {
        const productid = req.params.productid;
        const postOne = await Posts.findOne({ where: { productid } });
        const { userId } = res.locals.user;

        if (postOne.UserId !== userId) {
            return res.status(400).send({ errorMessage: "삭제 할 권한이 없습니다." });
        } else {
            await Posts.destroy({
                where: { [Op.and]: [{ productid }, { UserId: userId }] },
            });
            res.status(200).send({ message: "상품을 삭제하였습니다." });
        }
    } catch (error) {
        return res.status(404).send({ errorMessage: "상품 조회에 실패하였습니다." });
    }
});
module.exports = router;
