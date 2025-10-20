import { PrismaClient } from "./src/generated/prisma";

const client = new PrismaClient();
async function CreatePost(){
    try{
        const post = await client.post.create({
            data: {
                title: "first post",
                description: "description about first post",
                image: "https://image.png"
            }
        })
        console.log(post)
    }
    catch(error){
        console.log(error)
    }
}
async function CreateTag(){
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
async function CreateRelation(){
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
async function FindById(id: number){
    try {
        const foundedPost = await client.post.findUnique({
            where: {
                id: id
            }
        })
        console.log(foundedPost)
    }
    catch(error){
        console.log(error)
    }
}
CreatePost();
CreateTag();
CreateRelation();
FindById(1)