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

export type Post = Prisma.PostGetPayload<{}>;

export type PostWithTags = Prisma.PostGetPayload<{
    include: {
        tags: {
        include: {
            tag: true;
        }
        }
    }
}>;
export type CreatePost = Prisma.PostUncheckedCreateInput;

export type CreatePostUnchecked = Omit<Prisma.PostUncheckedCreateInput, 'id'>;
export type UpdatePost = Prisma.PostUpdateInput;
export type UpdatePostUnchecked = Prisma.PostUncheckedUpdateInput
export type BatchPayload = Prisma.BatchPayload

export interface IControllerContract{
    getPosts: (req: Request<object, PostWithTags[] | string, object, IQueryParams>,
        res: Response<PostWithTags[]|string>) => void,
    createPost: (req: Request<object, CreatePost|string, CreatePost>,
        res: Response<CreatePost|string, {userId: number}>) => void,
    getPostById: (req: Request<{id : string}, Post | string, object>,
        res: Response<Post | string>) => void,
    updatePostById: (req: Request<{id : string}, UpdatePost | string, UpdatePost>,
        res: Response<UpdatePost | string>) => void,
    deletePostById: (req: Request<{id: string}, Post | string, object>,
        res: Response<Post | string> 
    ) => void
}

export interface IServiceContract{
    getPosts: (params: IQueryParams) => Promise<IStatus<PostWithTags[]>>,
    createPost: (data: CreatePost) => Promise<IStatus<CreatePost>>,
    getPostById: (postId: number) => Promise<IStatus<Post>>,
    updatePostById: (postId: number, data: UpdatePost) => Promise<IStatus<UpdatePost>>,
    deletePostById: (postId: number) => Promise<{status: string, data?: Post}>
}

export interface IRepositoryContract{
    getPosts: (paramsObj: {params: IQueryParams}) => Promise<PostWithTags[]>,
    createPost: (data: CreatePost) => Promise<Post>,
    getPostById: (postId: number) => Promise<Post | null>,
    updatePostById: (postId: number, data: UpdatePost) => Promise<UpdatePost>,
    deletePostById: (postId: number) => Promise<Post>
}