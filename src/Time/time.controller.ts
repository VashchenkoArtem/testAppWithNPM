import type {Response, Request} from "express"
import requestServiceTime from "./time.service";


const requestControllerTime = {
    getTime: (req: Request, res: Response) => {
        req = req
        const response = requestServiceTime.getTime();
        res.status(200).json({ time: response });
    },
}

export default requestControllerTime