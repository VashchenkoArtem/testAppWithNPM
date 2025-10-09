import moment from "moment"

const requestServiceTime = {
    getTime: () => {
        let currentTime = moment().format("LTS");
        return currentTime;
    },
}
export default requestServiceTime