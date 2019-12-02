import Axios from "axios"

export const apiAdapter = (baseUrl)  => Axios.create({
    baseURL:baseUrl
})

