import { Request, Response} from "express"
import { Prisma } from "../generated/prisma"

export interface IQueryParams {
    skip?: string,
    take?: string,
    filter?: string
}
export interface IPost{
    title: string,
    description: string,
    image: string
}
export interface IStatus<T>{
    status: string,
    message?: string,
    data?: T
}

export type Post = Prisma.PostGetPayload<{}>;

export type PostWithTags = Prisma.PostGetPayload<{
    include: {
        tags: true
    }
}>;
export type CreatePost = Prisma.PostCreateInput;
export type CreatePostUnchecked = Omit<Prisma.PostUncheckedCreateInput, 'id'>;
export type UpdatePost = Prisma.PostUpdateInput;
export type UpdatePostUnchecked = Prisma.PostUncheckedUpdateInput


export interface IControllerContract{
    getPosts: (req: Request<object, Post[] | string, object, IQueryParams>,
        res: Response<Post[]|string>) => void,
    createPost: (req: Request<object, CreatePost[] | string, CreatePost[]>,
        res: Response<CreatePost[]|string>) => void,
    getPostById: (req: Request<{id : string}, Post | string, object>,
        res: Response<Post | string>) => void,
    updatePostById: (req: Request<{id : string}, UpdatePost | string, UpdatePost>,
        res: Response<UpdatePost | string>) => void,
    deletePostById: (req: Request<{id: string}, Post | string, object>,
        res: Response<Post | string> 
    ) => void
}
export interface IServiceContract{
    getPosts: (params: IQueryParams) => Promise<IStatus<Post[]>>,
    createPost: (data: CreatePost[] | CreatePost) => Promise<IStatus<CreatePost[]>>,
    getPostById: (postId: number) => Promise<IStatus<Post>>,
    updatePostById: (postId: number, data: UpdatePost) => Promise<IStatus<UpdatePost>>,
    deletePostById: (postId: number) => Promise<{status: string,
        data?: Post}>
}