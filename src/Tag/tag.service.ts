import { TagRepository } from "./tag.repository";
import { IServiceContract } from "./tag.types";



export const TagService: IServiceContract = {
    getTags: async(params) => {
        const tags = await TagRepository.getTags({params})
        return {
            status: "success",
            data: tags
        }
    },
    getTagById: async(objTagId) => {
        if (!Number(objTagId)){
            return {
                status: "Problem with ID",
                message: "Id is entering incorrectly!"
            }
        }
        const tagById = await TagRepository.getTagsById(objTagId)
        if (!tagById){
            return{
                status: "Does not exist",
                message: "Tag with this id does not exist!"
            }
        }
        
        return {
            status: "success",
            data: tagById
        }
    }
}