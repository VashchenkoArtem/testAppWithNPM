import { TagService } from "./tag.service";
import { IControllerContract, IQueryParams, IStatus, Tag } from "./tag.types";

export const tagController: IControllerContract = {
    getTags: async(req, res): Promise<void> => {
        const query: IQueryParams = {};
        if (req.query.skip) {
            query.skip = String(req.query.skip);
        }
        if (req.query.take){
            query.take = String(req.query.take);
        } 
        const response: IStatus<Tag[]> = await TagService.getTags(query)
        res.status(200).json(response.data)
    },
    getTagById: async(req, res): Promise<void> => {
        const tagId: number = Number(req.params.id);
        const response: IStatus<Tag> = await TagService.getTagById(tagId);
        if (response.status === "Does not exist"){
            res.status(404).json(response.message)
        }
        if (response.status === "Problem with ID"){
            res.status(400).json(response.message)
        }
        res.status(200).json(response.data)
    }
}