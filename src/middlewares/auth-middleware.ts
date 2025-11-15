import type {NextFunction, Request, Response} from "express"
import { verify } from "jsonwebtoken";
import { ENV } from "../config/env";


export function AuthMiddleware(req: Request, res: Response<string, {userId: number}>, next: NextFunction){
    const headers = req.headers.authorization
    if (!headers){
        res.status(401).json("Authorization is required!");
        return;
    }
    const [ typeToken, token ] = headers.split(" ");
    if (typeToken !== "Bearer" || !token){
        res.status(401).json("Invalid authorization!");
        return;
    }
    try{
        const decodedToken = verify(token, ENV.SECRET_KEY) as {id: number}
        res.locals.userId = decodedToken.id;
    }catch(error){
        throw error
    }
    next();
}