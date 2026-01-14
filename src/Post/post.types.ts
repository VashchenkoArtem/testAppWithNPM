import { Request, Response} from "express"
import { Prisma } from '@prisma/client'

export interface IQueryParams {
    skip?: string,
    take?: string,
    filter?: string
}
export interface IStatus<T>{
    status: string,
    message?: string,
    data?: T
}
export type Comment = Prisma.CommentGetPayload<{}>
export type CreateComment = Prisma.CommentUncheckedCreateInput

export type Post = Prisma.PostGetPayload<{}>;
export type PostWithRelations = Prisma.PostGetPayload<{
    include: {
        likes: true,
        comments: true
    }
}>
export type PostWithTags = Prisma.PostGetPayload<{
    include: {
        tags: {
        include: {
            tag: true;
        }
        }
    }
}>;

export type PostLike = Prisma.PostLikeGetPayload<{}>;
export type CreatePostLike = Prisma.PostLikeUncheckedCreateInput;

export type CreatePost = {
    id?: number | undefined;
    title: string;
    description: string;
    image: string;
    userId: number;
    likes?: Prisma.PostLikeUncheckedCreateNestedManyWithoutPostInput | undefined;
    tags?: number[];
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutPostInput;
}
export type UpdatePost = Prisma.PostUpdateInput;
export type UpdatePostUnchecked = Prisma.PostUncheckedUpdateInput


export interface IControllerContract{
    getPosts: (req: Request<object, PostWithTags[] | string, object, IQueryParams>,
        res: Response<PostWithTags[]|string>) => void,
    createPost: (req: Request<object, Post|string, CreatePost>,
        res: Response<Post|string>) => void
    getPostById: (req: Request<{id : string}, PostWithRelations | string, object>,
        res: Response<PostWithRelations | string>) => void,
    updatePostById: (req: Request<{id : string}, UpdatePost | string, UpdatePost>,
        res: Response<UpdatePost | string>) => void,
    deletePostById: (req: Request<{id: string}, Post | string, object>,
        res: Response<Post | string> 
    ) => void,
    createComment: (
        req: Request<{postId: string}, Comment | string, {content: string}>,
        res: Response<Comment | string>
    ) => void
    likePost: (
        req: Request<{postId: string}, PostLike | string, object>,
        res: Response<PostLike | string>
    ) => void
    unlikePost: (
        req: Request<{postId: string}, PostLike | string, object>,
        res: Response<PostLike | string>
    ) => void
    checkLike: (
        req: Request<{postId: string}, boolean | string>,
        res: Response<boolean | string>
    ) => void
}

export interface IServiceContract{
    getPosts: (params: IQueryParams) => Promise<IStatus<PostWithTags[]>>,
    createPost: (data: CreatePost, userId: number) => Promise<Post>,
    getPostById: (postId: number, likedBy: boolean, comments: boolean) => Promise<IStatus<PostWithRelations>>,
    updatePostById: (postId: number, data: UpdatePost) => Promise<IStatus<UpdatePost>>,
    deletePostById: (postId: number) => Promise<{status: string, data?: Post}>
    createComment: (content: {content: string}, authorId: number, postId: number) => Promise<Comment | string>
    likePost: (postId: number, userId: number) => Promise<PostLike | string>
    unlikePost: (postId: number, userId: number) => Promise<PostLike | string>
    checkLike: (postId: number, userId: number) => Promise<boolean | string>
}

export interface IRepositoryContract{
    getPosts: (paramsObj: {params: IQueryParams}) => Promise<PostWithTags[]>,
    createPost: (data: CreatePost, userId: number) => Promise<Post>,
    getPostById: (postId: number, likedBy?: boolean, comments?: boolean) => Promise<PostWithRelations | null>,
    updatePostById: (postId: number, data: UpdatePost) => Promise<UpdatePost>,
    deletePostById: (postId: number) => Promise<Post>
    createComment: (content: {content: string}, authorId: number, postId: number) => Promise<Comment>
    likePost: (postId: number, userId: number) => Promise<PostLike>
    findLike: (postId: number, userId: number) => Promise<PostLike | null>
    unlikePost: (postId: number, userId: number) => Promise<PostLike>
    checkLike: (postId: number, userId: number) => Promise<boolean | string>
}