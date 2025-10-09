import type { Request, Response } from "express"
import requestServiceUsers from "./users.service";


const requestControllerUsers = {
    getUsers: (req: Request, res: Response) => {
        req = req
        const response = requestServiceUsers.getUsers();
        res.status(200).json(response.data);
    },
    getUserById: (req: Request, res: Response) => {
        const userId = Number(req.params.id);
        const fields = String(req.query.fields);
        const response = requestServiceUsers.getUserById(userId, fields);
        if (response.status === "incorrect number"){
            res.status(400).json(response.message);
            return;
        }
        if (response.status === "not found"){
            res.status(404).json(response.message);
            return;
        }
        res.status(200).json(response.data);
    }
}
export default requestControllerUsers