import { IRepositoryContract } from "./user.types";
import { client } from "../client/client";
import { Prisma } from "../generated/prisma";


export const userRepository: IRepositoryContract = {
    createUser: async (data) => {
        try{
            const createdUser = await client.user.create({
                data: data
            })
            return createdUser
        }catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                if (error.code === "P2024"){
                    console.log("Timed out fetching a new connection from the connection pool")
                }
            }
            throw error
        }
    },
    findUserByEmail: async (email) => {
        try{
            const foundedUser = await client.user.findUnique({where: {
                email: email
            }})
            return foundedUser;
        }catch(error){
            throw error
        }
    }
}   