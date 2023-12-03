import Router from "express";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import {
    PostNotExistError,
    PostsNotExistError,
    CantSortError,
    NotMatchedIdError,
} from "../lib/CustomError.js";
import { postSchemaValidation } from "../lib/joi-validation.js";
import { prisma } from "../utils/prisma/index.js";

const postsRouter = Router();

// 게시글 등록 API
postsRouter.post("/", auth_middleware, async (req, res, next) => {
    const { userId } = res.locals.user;
    try {
        const { title, content, price, status } =
            await postSchemaValidation.validateAsync(req.body);

        await prisma.posts.create({
            data: { UserId: +userId, title, content, status, price },
        });
        return res.status(200).json({ message: "판매 상품을 등록하였습니다." });
    } catch (err) {
        next(err);
    }
});

// 상품 목록 조회 API
postsRouter.get("/", async (req, res, next) => {
    let querySTR = req.query.sort;

    try {
        let val = "desc";
        if (querySTR === "desc" || querySTR === undefined) {
            val;
        } else if (querySTR === "asc" || querySTR === null) {
            val = "asc";
        } else {
            const err = new CantSortError();
            throw err;
        }

        const allPosts = await prisma.posts.findMany({
            select: {
                title: true,
                status: true,
                price: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: val,
            },
        });
        // 게시글들이 존재하지 않을 때
        if (allPosts.length === 0) {
            const err = new PostsNotExistError();
            throw err;
        }
        return res.status(200).json({ data: allPosts });
    } catch (err) {
        next(err);
    }
});

// 상품 상세 조회 API
postsRouter.get("/:postid", async (req, res, next) => {
    const postid = req.params.postid;
    try {
        const postOne = await prisma.posts.findUnique({
            where: { postId: +postid },
            select: {
                UserId: true,
                title: true,
                content: true,
                status: true,
                price: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        // 게시글이 존재하지 않을 때
        if (!postOne) {
            const err = new PostNotExistError();
            throw err;
        }
        return res.status(200).json({ data: postOne });
    } catch (err) {
        next(err);
    }
});

// 상품 수정 API
postsRouter.put("/:postid", auth_middleware, async (req, res, next) => {
    const postid = req.params.postid;
    const { userId } = res.locals.user;
    const postOne = await prisma.posts.findUnique({
        where: { postId: +postid },
    });
    try {
        const { title, content, status, price } =
            await postSchemaValidation.validateAsync(req.body);
        if (!postOne) {
            const err = new PostNotExistError();
            throw err;
        } else if (postOne.UserId !== userId) {
            const err = new NotMatchedIdError();
            throw err;
        } else {
            const updatedPost = await prisma.posts.update({
                where: {
                    postId: +postid,
                },
                data: {
                    title,
                    content,
                    status,
                    price,
                },
            });
            res.status(200).send({ data: updatedPost });
        }
    } catch (err) {
        next(err);
    }
});

// 상품 삭제 API
postsRouter.delete("/:postid", auth_middleware, async (req, res, next) => {
    try {
        const postid = req.params.postid;
        const postOne = await prisma.posts.findUnique({
            where: { postId: +postid },
        });
        const { userId } = res.locals.user;

        if (postOne.UserId !== userId) {
            const err = new NotMatchedIdError();
            throw err;
        } else {
            await prisma.posts.delete({
                where: {
                    postId: +postid,
                },
            });
            res.status(200).send({ message: "상품을 삭제하였습니다." });
        }
    } catch (err) {
        next(err);
    }
});

export { postsRouter };
