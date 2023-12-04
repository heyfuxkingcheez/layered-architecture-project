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
import { PostsController } from "./../controllers/posts.controller.js";

const postsRouter = Router();
const postsController = new PostsController();

// 게시글 등록 API
postsRouter.post("/", auth_middleware, postsController.createPost);

// 상품 목록 조회 API
postsRouter.get("/", postsController.getPosts);

// 상품 상세 조회 API
postsRouter.get("/:postId", postsController.getPost);

// 상품 수정 API
postsRouter.put("/:postId", auth_middleware, postsController.updatePost);

// 상품 삭제 API
postsRouter.delete("/:postId", auth_middleware, postsController.deletePost);

export { postsRouter };
