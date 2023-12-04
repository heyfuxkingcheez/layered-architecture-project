import { PostsRepository } from "../repositories/posts.repository.js";

export class PostsService {
    postsRepository = new PostsRepository();

    // 게시글 조회
    findAllPosts = async () => {
        const posts = await this.postsRepository.findAllPosts();

        return posts.map((post) => {
            return {
                postId: post.postId,
                title: post.title,
                content: post.content,
                status: post.content,
                price: post.price,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            };
        });
    };

    // 게시글 상세 조회
    findOnePost = async (postId) => {
        const post = await this.postsRepository.findOnePost(postId);

        return {
            postId: post.postId,
            title: post.title,
            content: post.content,
            status: post.status,
            price: post.price,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    };

    // 게시글 작성
    createPost = async (userId, title, content, price) => {
        const createdPost = await this.postsRepository.createPost(
            userId,
            title,
            content,
            price
        );

        return {
            postId: createdPost.postId,
            title: createdPost.title,
            content: createdPost.content,
            status: createdPost.status,
            price: createdPost.price,
            createdAt: createdPost.createdAt,
            updatedAt: createdPost.updatedAt,
        };
    };

    // 게시글 수정
    updatePost = async (postId, title, content, status, price) => {
        const post = await this.postsRepository.findOnePost(postId);
        if (!post) throw new Error("존재하지 않는 게시글 입니다.");

        await this.postsRepository.updatePost(
            postId,
            title,
            content,
            status,
            price
        );

        const updatedPost = await this.postsRepository.findOnePost(postId);

        return {
            postId: updatedPost.postId,
            title: updatedPost.title,
            content: updatedPost.content,
            status: updatedPost.status,
            price: updatedPost.price,
            createdAt: updatedPost.createdAt,
            updatedAt: updatedPost.updatedAt,
        };
    };

    deletePost = async (postId) => {
        const post = await this.postsRepository.findOnePost(postId);
        if (!post) throw new Error("존재하지 않는 게시글 입니다");

        await this.postsRepository.deletePost(postId);
    };
}
