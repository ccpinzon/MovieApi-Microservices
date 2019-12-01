import Axios from "axios"
module.exports = (baseURL) => Axios.create({
    baseURL,
});
