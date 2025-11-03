import { IRepositoryContract } from "./tag.types"
import { client } from "../client/client"


export const TagRepository: IRepositoryContract = {
    getTags: async(paramsObj) => {
        try{
            const { skip, take } = paramsObj.params;
            const tags = await client.tag.findMany({
                skip: skip ? Number(skip) : undefined,
                take: take ? Number(take) : undefined,
            })
            return tags
        }catch(error){
            throw error
        }
    },
    getTagsById: async(tagIdObj) => {
        try{
            const tagId = tagIdObj
            const tag = await client.tag.findUnique({
                where: {
                    id: tagId
                }
            })
            return tag
        }catch (error){
            throw error
        }
    }
}