import { IRepositoryContract } from "./user.types";
import { client } from "../client/client";


export const userRepository: IRepositoryContract = {
    createUser: async (data) => {
        const createdUser = await client.user.create({
            data: data
        })
        return createdUser
    },
    findUserByEmail: async (email) => {
        const foundedUser = await client.user.findUnique({where: {
            email: email
        }})
        return foundedUser;
    }
}   