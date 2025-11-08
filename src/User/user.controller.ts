import { IControllerContract } from "./user.types";
import { userService } from "./user.service";


export const userController: IControllerContract = {
    registration: async(req, res) => {
        const dataUser = req.body
        const response = await userService.createUser(dataUser)
        res.status(200).json(response)
    },
    login: async(req, res)=> {
        const dataUser = req.body;
        const response = await userService.findUserByEmail(dataUser)
        res.status(200).json(response)
    }   
}       