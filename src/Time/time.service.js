const moment = require("moment");

const requestService = {
    getTime: (req, res) => {
        let currentTime = moment().format("LTS");
        return currentTime;
    },
}

module.exports=requestService;