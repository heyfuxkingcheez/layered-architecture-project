import { PostsService } from "../services/posts.service.js";
import { postSchemaValidation } from "../lib/joi-validation.js";

export class PostsController {
    postsService = new PostsService();

    // 게시글 목록 조회
    getPosts = async (req, res, next) => {
        try {
            // const queryData = req.query.sort;
            // let sortWord = "desc";

            // if (queryData === undefined || queryData.toLowerCase() === "desc") {
            //     sortWord = "desc";
            // } else if (queryData.toLowerCase() === "asc") {
            //     sortWord = "desc";
            // } else {
            //     throw new Error({ name: "올바른 경로가 아닙니다." });
            // }

            const posts = await this.postsService.findAllPosts();

            return res
                .status(200)
                .json({ data: posts, message: "게시글 목록 조회 성공" });
        } catch (err) {
            next(err);
        }
    };

    // 게시글 상세 조회
    getPost = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const post = await this.postsService.findOnePost(postId);

            return res
                .status(200)
                .json({ data: post, message: "게시글 상세 조회 성공" });
        } catch (err) {
            next(err);
        }
    };

    // 게시글 작성
    createPost = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { title, content, price } =
                await postSchemaValidation.validateAsync(req.body);
            const createdPost = await this.postsService.createPost(
                userId,
                title,
                content,
                price
            );

            return res
                .status(200)
                .json({ data: createdPost, message: "게시글 생성 성공" });
        } catch (err) {
            next(err);
        }
    };

    // 게시글 수정
    updatePost = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals.user;
            const { title, content, status, price } =
                await postSchemaValidation.validateAsync(req.body);

            const updatedPost = await this.postsService.updatePost(
                postId,
                userId,
                title,
                content,
                status,
                price
            );

            return res
                .status(200)
                .json({ data: updatedPost, message: "게시글 수정 성공" });
        } catch (err) {
            next(err);
        }
    };

    // 게시글 삭제
    deletePost = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals.user;
            const deletedPost = await this.postsService.deletePost(
                postId,
                userId
            );

            return res
                .status(200)
                .json({ data: deletedPost, message: "게시글 삭제 성공" });
        } catch (err) {
            next(err);
        }
    };
}
