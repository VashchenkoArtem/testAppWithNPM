import { IServiceContract } from "./user.types";
import { userRepository } from "./user.repository";


export const userService : IServiceContract = {
    createUser: async(data)=>{
        const createdUser = await userRepository.createUser(data)
        console.log("asdadasa")
        if (!createdUser){
            return "Error. User didn`t create"
        }
        return createdUser

    },
    findUserByEmail: async(data)=>{
        const foundedUser = await userRepository.findUserByEmail(data.email)
        if (!foundedUser){
            return `Can't find user`
        }
        if (!(data.password === foundedUser.password)){
            return "Password is incorrect!"
        }
        return foundedUser
    }
}