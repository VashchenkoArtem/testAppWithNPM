const service = require('./users.service');

const requestController = {
    getUsers: (req, res) => {
        const username = req.query.name;
        const response = service.getUsers(username);
        res.status(200).json(response.data);
    },
    getUserById: (req, res) => {
        const userId = Number(req.params.id);
        const fields = req.query.fields;
        const response = service.getUserById(userId, fields);
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

module.exports=requestController;