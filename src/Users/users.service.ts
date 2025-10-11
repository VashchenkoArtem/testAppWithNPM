import path from "path"
import fs from "fs"
import { IStatus } from "../Post/post.types";


const requestServiceUsers = {
    getUsers: (): IStatus => {
        const pathToUsers = path.join(__dirname, "../../jsonFiles/users.json");
        const allUsers = JSON.parse(fs.readFileSync(pathToUsers, "utf-8"));

        let filteredUsers = [ ...allUsers ];
        return {
            status: "success",
            data: filteredUsers
        };
    },
    getUserById: (userId: number, fields: string): IStatus => {
        const pathToUsers = path.join(__dirname, "../../jsonFiles/users.json");
        const allUsers = JSON.parse(fs.readFileSync(pathToUsers, "utf-8"));
        let choosedUser = [ ...allUsers ];
        if (Number.isNaN(userId)){
            return {
                status: "incorrect number",
                message: "Please, enter a correct id in parameter!"
            }
        }
        if (userId <= 0 || userId > choosedUser.length){
            return {
                status: "not found",
                message: "User with this ID is not found!"
            }
        }
        choosedUser = choosedUser.find((user) => {
            return user.id === userId;
        })
        if (fields !== "undefined"){
            const fieldsArray = fields.split(",");
            for (let field of fieldsArray){
                if (!(field in choosedUser)){
                    return {
                        status: "not found",
                        message: `Field ${field} is not found!`
                    }
                }
            }
            let filteredUserAnswer: any = {};
            fieldsArray.forEach((field: any) => {
                filteredUserAnswer[field] = choosedUser[field];
            })
            choosedUser = filteredUserAnswer;
            console.log(filteredUserAnswer);
        }
        return {
            status: "success",
            data: choosedUser
        }
    }
}
export default requestServiceUsers