import { Prisma } from "../generated/prisma";
import type { Request, Response } from "express";
export type UserWithoutPassword = Prisma.UserGetPayload<{
    omit: {
        password: true
    }
}>
export type IResponse = {
    token: string
}
export type IStatus<T> = {
    status: string,
    message?: string,
    data: T
}
export type CreateUser = Prisma.UserUncheckedCreateInput

export interface IControllerContract {
    registration: (
        req: Request<object, CreateUser | string, CreateUser>,
        res: Response<CreateUser | string>
    ) => Promise<void>,
    login: (
        req: Request<object, CreateUser | string, CreateUser>,
        res: Response<CreateUser | string>
    ) => Promise<void>
}
export interface IServiceContract {
    createUser: (data: CreateUser) => Promise<CreateUser | string>
    findUserByEmail: (data: CreateUser) => Promise<CreateUser | string>
}
export interface IRepositoryContract {
    createUser: (data: CreateUser) => Promise<CreateUser | null>
    findUserByEmail: (email: string) => Promise<CreateUser | null>
}