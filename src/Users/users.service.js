const path = require("path");
const fs = require("fs");

const requestService = {
    getUsers: (username) => {
        
        const pathToUsers = path.join(__dirname, "../../jsonFiles/users.json");
        const allUsers = JSON.parse(fs.readFileSync(pathToUsers, "utf-8"));

        let filteredUsers = [ ...allUsers ];
        if (username){
            filteredUsers = filteredUsers.filter((user) => {
                return user.name === username
            })
            if (filteredUsers.length === 0){
                return {
                    status: "not found",
                    message: "Users with this name are not found!"
                }
            }
        }
        return {
            status: "success",
            data: filteredUsers
        };
    },
    getUserById: (userId, fields) => {
        const pathToUsers = path.join(__dirname, "../../jsonFiles/users.json");
        const allUsers = JSON.parse(fs.readFileSync(pathToUsers, "utf-8"));
        let choosedUser = [ ...allUsers ];
        if (isNaN(userId)){
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
        if (fields){
            const fieldsArray = fields.split(",");
            for (let field of fieldsArray){
                if (!(field in choosedUser)){
                    return {
                        status: "not found",
                        message: `Field ${field} is not found!`
                    }
                }
            }
            let filteredUserAnswer = {};
            fieldsArray.forEach((field) => {
                filteredUserAnswer[field] = choosedUser[field];
            })
            choosedUser = filteredUserAnswer;
        }
        return {
            status: "success",
            data: choosedUser
        }
    }
}

module.exports=requestService