import { IServiceContract } from "./user.types";
import { userRepository } from "./user.repository";


export const userService : IServiceContract = {
    createUser: async(data)=>{
        const user = await userRepository.findUserByEmail(data.email)
        if (user){
            return "Error. User already exist!"
        }
        const createdUser = await userRepository.createUser(data)
        if (!createdUser){
            return "Error. User didn`t create!"
        }
        return createdUser

    },
    findUserByEmail: async(data)=>{
        const foundedUser = await userRepository.findUserByEmail(data.email)
        if (!foundedUser){
            return `Can't find user!`
        }
        if (!(data.password === foundedUser.password)){
            return "Password is incorrect!"
        }
        return foundedUser
    }
}