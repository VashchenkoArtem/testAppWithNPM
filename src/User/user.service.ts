import { IServiceContract } from "./user.types";
import { userRepository } from "./user.repository";
import { sign } from "jsonwebtoken";
import { ENV } from "../config/env";
import { compare, hash } from "bcrypt";


export const userService : IServiceContract = {
    createUser: async(data)=>{
        const user = await userRepository.findUserByEmail(data.email)
        if (user){
            return "Error. User already exist!"
        }
        const hashedPassword = await hash(data.password, 10)
        const dataWithHashedPassword = {...data, password: hashedPassword}
        const createdUser = await userRepository.createUser(dataWithHashedPassword)
        if (!createdUser){
            return "Error. User didn`t create!"
        }
        const token = sign({id: createdUser.id}, ENV.SECRET_KEY, {
            expiresIn: "7d"
        })
        return { token }

    },
    findUserByEmail: async(data)=>{
        const foundedUser = await userRepository.findUserByEmail(data.email)
        if (!foundedUser){
            return `Can't find user!`
        }
        const isMatch = await compare(data.password, foundedUser.password)
        if (!(isMatch)){
            return "Password is incorrect!"
        }
        const token = sign({id: foundedUser.id}, ENV.SECRET_KEY, {
            expiresIn: "7d"
        })
        return { token }
    },
    me: async(id)=>{
        const foundedUser = await userRepository.findByIdWithoutPassword(id)
        if (!foundedUser){
            return "Cannot find user"
        }
        return foundedUser
    }
}