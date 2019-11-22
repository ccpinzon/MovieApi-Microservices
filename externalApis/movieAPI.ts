import Axios from "axios"
import * as envs from "../enviroments"
import {timeWindowEnum} from "../models/timeWindow.enum";
import {json} from "express"



const axios = Axios

const baseUrl = envs.baseUrlTheMovieApi
const baseUrlImages = envs.baseUrlImages
const API_KEY = process.env.API_KEY

const paramsBase = {
    api_key : API_KEY,
    language: "es-CO"
}

export async function getTestApi(): Promise<Object> {
    console.log(baseUrl)
    const context = "movie"
    const movieId = 384018
    const url = baseUrl + context
    let jsonRes: any = {}
    const params = {
        ...paramsBase
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

export async function getTrendingMovies( timeWindow:timeWindowEnum = timeWindowEnum.WEEK, page:number = 1 ) : Promise<Object> {

    // https://api.themoviedb.org/3/trending/movie/week?api_key=7888561a6eff93666be6d54db238535e&page=1

    const context = "trending/movie/"
    const time = timeWindow.toString()

    const url = baseUrl + context + time
    console.log("url -> " + url)
/*    const params = {
        api_key : API_KEY,
        page: page,
        language: "es-CO"
    }*/

    const params = {
        ...paramsBase,
        page: page
    }

    let jsonRes: any = {}
    let response: Object = {}
    try {
        const apiGetTest = await axios.get(url,{params:params})
        jsonRes = apiGetTest.data
    }catch (e) {
        console.error("errorrequest -> " + e);
    }

    if (jsonRes){
        const movieList = []
        let movie = {}

        for (const movAux of jsonRes.results) {
            const posterImage = await generateUrlImage(movAux.poster_path)
            movie = {
                id:  movAux.id,
                score: movAux.vote_average,
                title: movAux.title,
                date: movAux.release_date,
                resume: movAux.overview,
                posterImage: posterImage
            }
            movieList.push(movie)
        }


        response = {
            page : jsonRes.page,
            movies: movieList
        }
    }
    return response

}

export async function getMoviesBySearch(textToSearch: string) : Promise<Object>{

   // https://api.themoviedb.org/3/search/movie?api_key=7888561a6eff93666be6d54db238535e&language=es-CO&query=marvel&page=1&include_adult=false

    const context = "search/movie"
    const url = baseUrl + context

    const params = {
        ...paramsBase,
        query:textToSearch,
        include_adult: false
    }

    let jsonRes: any = {}
    let response: Object = {}
    try {
        const apiGetTest = await axios.get(url,{params:params})
        jsonRes = apiGetTest.data
    }catch (e) {
        console.error("errorrequest -> " + e);
    }

    if (jsonRes){
        const movieList = []
        let movie = {}

        for (const movAux of jsonRes.results) {
            const posterImage = await generateUrlImage(movAux.poster_path)
            movie = {
                id:  movAux.id,
                score: movAux.vote_average,
                title: movAux.title,
                date: movAux.release_date,
                resume: movAux.overview,
                posterImage: posterImage
                //posterImage: movAux.poster_path
            }
            movieList.push(movie)
        }


        response = {
            page : jsonRes.page,
            movies: movieList
        }

    }
    return response

}


async function generateUrlImage( imagePath:string ) : Promise<string> {
    if (imagePath) {
        //console.log('generate image url to -> ' + imagePath)
        return baseUrlImages + (imagePath.replace('/', '').replace('\'', ''))
    }
   return undefined
}
