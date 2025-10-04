const service = require("./post.service")

const requestController = {
    // getTime: (req, res) => {
    //     const response = service.getTime(req, res);
    //     res.status(200).json(response);
    // },
    getPosts: (req, res) => {
        const skip = req.query.skip;
        const take = req.query.take;
        const filter = req.query.filter;
        const response = service.getPosts(skip, take, filter);
        if (response.status === "incorrect number"){
            res.status(400).json("Please, enter a correct number in parameters!");
            return;
        }
        res.status(200).json(response.data);
    },
    createPost: async (req, res) => {
        let data = req.body;
        const response = await service.createPost(data);
        if (response.status === "data incorrect"){
            res.status(422).json("Please, enter data correctly!");
            return;
        }
    
        res.status(201).json(response.data);
    },
    getPostById: (req, res) => {
        const postId = req.params.id;
        const response = service.getPostById(postId);
        if (response.status === "incorrect number"){
            res.status(400).json("Please, enter a correct number in parameters!");
            return;
        }
        if (response.status === "not found"){
            res.status(404).json("Post with this ID is not found!");
            return;
        }
        res.status(200).json(response.data);
    }

}

module.exports=requestController;