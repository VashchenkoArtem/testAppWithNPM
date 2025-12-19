import { Request, Response} from "express"
import { Prisma } from '@prisma/client'

export interface IQueryParams {
    skip?: string,
    take?: string
}

export interface IStatus<T> {
    status: string,
    message?: string,
    data?: T
}

export type Tag = Prisma.TagGetPayload<{}>

export interface IControllerContract{
    getTags: (req: Request<object, Tag[] | string,object, IQueryParams>,
            res: Response<Tag[] | string>) => void,
    getTagById: (req: Request<{id: number}, Tag | string, object>,
            res: Response<Tag | string>) => void
}
export interface IServiceContract{
    getTags: (params: IQueryParams) => Promise<IStatus<Tag[]>>,
    getTagById: (tagId: number) => Promise<IStatus<Tag>>
}
export interface IRepositoryContract{
    getTags: (paramsObj: {params: IQueryParams}) => Promise<Tag[]>,
    getTagsById: (tagId: number) => Promise<Tag | null>
}