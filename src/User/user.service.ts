import { IServiceContract } from "./user.types";
import { userRepository } from "./user.repository";


export const userService : IServiceContract = {
    createUser: async(data)=>{
        const createdUser = await userRepository.createUser(data)
        if (!createdUser){
            return "error"
        }
        return createdUser

    },
    findUserByEmail: async(data)=>{
        const foundedUser = await userRepository.findUserByEmail(data.email)
        if (!foundedUser){
            return "error"
        }
        if (!(data.password === foundedUser.password)){
            return "Password is incorrect!"
        }
        return foundedUser
    }
}