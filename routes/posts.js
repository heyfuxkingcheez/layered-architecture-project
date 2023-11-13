const express = require("express");
const router = express.Router();
const { Users, Posts, sequelize } = require("../models");

// 상품 등록 API
router.post("/posts", async (req, res) => {
    const { title, content, price } = req.body;

    if (!title || !content || !price) {
        return res.status(400).json({ errorMessage: "형식이 올바르지 않습니다." });
    }
    await Posts.create({
        UserId: 1,
        title,
        content,
        price,
    });
    return res.status(200).json({ message: "판매 상품을 등록하였습니다." });
});

// 상품 목록 조회 API
router.get("/posts", async (req, res) => {
    try {
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
            order: [["createdAt", "desc"]],
        });
        return res.status(200).json({ allPosts });
    } catch (error) {
        return res.status(400).json({ errorMessage: "작성된 글이 없습니다." });
    }
});

// 상품 상세 조회 API
router.get("/post/:productid", async (req, res) => {
    const productid = req.params.productid;
    const postOne = await Posts.findOne({
        attributes: ["productId", "title", "content", "status", "price", "createdAt", "updatedAt"],
        include: [
            {
                model: Users,
                attributes: ["nickname"],
            },
        ],
        where: { productid },
    });

    try {
        const postDetail = {
            productid: postOne.productid,
            UserId: postOne.UserId,
            title: postOne.title,
            content: postOne.content,
            status: postOne.status,
            createdAt: postOne.createdAt,
            updatedAt: postOne.updatedAt,
            nickname: postOne.User.dataValues.nickname,
        };
        res.json(postDetail);
    } catch (error) {
        res.status(400).json({ errorMessage: "상세 목록 조회 실패!" });
    }
});

// 상품 수정 API
router.put("/post/:productid", async (req, res) => {
    const productid = req.params.productid;
    const { title, content, status, price } = req.body;
    const postOne = await Posts.findOne({ where: { productid } });
    // console.log("========>>", postOne);
    id = 1;
    try {
        if (postOne.UserId !== id) {
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
            await Posts.update(insertOne, { where: { productid } });
            res.status(200).send({ message: "상품 정보 수정 완료" });
        }
    } catch (error) {
        return res.status(400).send({ errorMessage: "상품 조회에 실패하였습니다." });
    }
});

// 상품 삭제 API
router.delete("/post/:productid", async (req, res) => {
    try {
        const productid = req.params.productid;
        const postOne = await Posts.findOne({ where: { productid } });
        id = 1;

        if (postOne.UserId !== id) {
            return res.status(400).send({ errorMessage: "삭제 할 권한이 없습니다." });
        } else {
            await Posts.destroy({ where: { productid } });
            res.status(200).send({ message: "상품을 삭제하였습니다." });
        }
    } catch (error) {
        return res.status(404).send({ errorMessage: "상품 조회에 실패하였습니다." });
    }
});
module.exports = router;
