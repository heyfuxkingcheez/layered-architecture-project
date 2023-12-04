import { prisma } from "../utils/prisma/index.js";

export class PostsRepository {
    // 게시글 목록 조회
    findAllPosts = async () => {
        const posts = await prisma.posts.findMany();

        return posts;
    };

    // 게시글 상세 조회
    findOnePost = async (postId) => {
        const post = await prisma.posts.findUnique({
            where: { postId: +postId },
        });

        return post;
    };

    // 게시글 작성
    createPost = async (userId, title, content, price) => {
        const createdPost = await prisma.posts.create({
            data: {
                UserId: +userId,
                title,
                content,
                price,
            },
        });

        return createdPost;
    };

    // 게시글 수정
    updatePost = async (postId, title, content, status, price) => {
        const updatedPost = await prisma.posts.update({
            where: {
                postId: +postId,
            },
            data: {
                title,
                content,
                status,
                price,
            },
        });

        return updatedPost;
    };

    // 게시글 삭제
    deletePost = async (postId) => {
        const deletedPost = await prisma.posts.delete({
            where: {
                postId: +postId,
            },
        });

        return deletedPost;
    };
}
