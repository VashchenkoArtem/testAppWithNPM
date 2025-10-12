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
export interface IStatus{
    status: string,
    message?: string,
    data?: {}
}

export type Post = IPost & {"id": number};
export type CreatePostData = Omit<IPost, "id">;
export type UpdatePostData = Partial<Omit<IPost, "id">>