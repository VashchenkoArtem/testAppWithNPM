import { Request, Response} from "express"

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

export type Post = IPost & {"id": number};
export type CreatePostData = Omit<IPost, "id">;
export type UpdatePostData = Partial<Omit<IPost, "id">>

export interface IControllerContract{
    getPosts: (req: Request<object, Post[] | string, object, IQueryParams>,
        res: Response<Post[]|string>) => void,
    createPost: (req: Request<object, Post[] | string, CreatePostData>, 
        res: Response<Post[]|string>) => void
}
export interface IServiceContract{
    getPosts: (params: IQueryParams) => IStatus<Post[]>,
    createPost: (data: CreatePostData[] | CreatePostData) => Promise<IStatus<Post[]>>
}