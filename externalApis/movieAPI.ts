import Axios from "axios"
import * as envs from "../enviroments"
const axios = Axios

export async function getTestApi(): Promise<Object> {
    const baseUrl = envs.baseUrlTheMovieApi
    console.log(baseUrl)
    const context = "movie"
    const movieId = 384018
    const url = baseUrl + context
    let jsonRes: any = {}
    const params = {
        api_key : process.env.API_KEY,
        language: "es-CO"
    }
    console.log("url -> " + url)
    try {
        const apiGetTest = await axios.get(url+'/'+movieId,{params:params})
        jsonRes = apiGetTest.data
    }catch (e) {
        console.error("errorrequest -> " + e);
    }


    const dataMovie = {
        title: jsonRes.title,
        score: jsonRes.vote_average,
        webUrl: jsonRes.homepage,
        resume: jsonRes.overview,
    }

    return dataMovie
}
