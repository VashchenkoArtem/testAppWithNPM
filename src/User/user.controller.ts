import { IControllerContract } from "./user.types";
import { userService } from "./user.service";


export const userController: IControllerContract = {
    registration: async(req, res) => {
        const dataUser = req.body
        const response = await userService.createUser(dataUser)
        if (response === "Error. User didn`t create"){
            res.status(400).json(response)
        }
        res.status(200).json(response)
    },
    login: async(req, res)=> {
        const dataUser = req.body;
        const response = await userService.findUserByEmail(dataUser)
        if (response === "Can't find user"){
            res.status(404).json(response)
        }
        res.status(200).json(response)
    }   
}       