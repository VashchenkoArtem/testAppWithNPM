import { PrismaClient } from "./src/generated/prisma";
import { CreatePost, UpdatePost } from "./src/Post/post.types";

export const client = new PrismaClient();

export async function CreateNewPost(data: CreatePost){
    try{
        const post = await client.post.create({
            data: 
                data
        })
        console.log("start seed")
        console.log(data.tags)
        post
        console.log("finish seed")
    }
    catch(error){
        console.log(error)
    }
}
export async function CreateTag(){
    try {
        const tag = await client.tag.create({
            data: {
                name: "Tag1"
            }
        })
        console.log(tag)
    }
    catch(error){
        console.log(error)
    }
}
export async function CreateRelation(){
    try {
        const tagsOnPosts = await client.tagsOnPosts.create({
            data: {
                tagId: 1,
                postId:1
            }
        })
        console.log(tagsOnPosts)
    }
    catch(error){
        console.log(error)
    }
}
export async function FindById(id: number){
    try {
        const foundedPost = await client.post.findUnique({
            where: {
                id: id
            }
        })
        return foundedPost
    }
    catch(error){
        return error || null
    }
}
export async function updatePostById(id: number, data: UpdatePost){
    try{
        const updatedPost = await client.post.update({where: 
            {id: id}
            ,  data: {
            title: data.title,
            description: data.description,
            image: data.image,
            tags: data.tags,
        },
        })
        console.log(updatedPost)
    }catch(error){
        console.log(error)
    }
}
// CreatePost();
// CreateTag();
// CreateRelation();
// FindById(1)