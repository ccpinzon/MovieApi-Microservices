import Axios from "axios"

const axios = Axios

export async function getTestApi(): Promise<Object> {

    const apiGetTest = await axios.get('https://api.themoviedb.org/3/movie/384018?api_key=7888561a6eff93666be6d54db238535e&language=es-CO')
    const jsonRes = apiGetTest.data
    const dataMovie = {
        title: jsonRes.title,
        score: jsonRes.vote_average,
        webUrl: jsonRes.homepage,
        resume: jsonRes.overview,
    }

    return dataMovie
}
