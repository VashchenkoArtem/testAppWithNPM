const service = require("./time.service")

const requestController = {
    getTime: (req, res) => {
        const response = service.getTime(req, res);
        res.status(200).json(response);
    },
}

module.exports=requestController;