import Axios from "axios"


export const apiAdapter = (baseUrl)  => Axios.create({
    baseUrl,
})
module.exports = (baseURL) => Axios.create({
    baseURL,
});
