import Axios from "axios"
import * as envs from "../enviroments"
import {timeWindowEnum} from "../models/timeWindow.enum"
import {SizeEnum} from "../models/size.enum"


const axios = Axios

const baseUrl = envs.baseUrlTheMovieApi
const baseUrlImages = envs.baseUrlImages
const sizeImageBig = envs.BigSizeImage
const sizeImageSmall = envs.BigSmallImage
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

// movies

export async function getTrending(timeWindow:timeWindowEnum = timeWindowEnum.WEEK, page:number = 1 , context:string = "trending./movie" ) : Promise<Object> {

    // https://api.themoviedb.org/3/trending/movie/week?api_key=7888561a6eff93666be6d54db238535e&page=1

    const time = timeWindow.toString()

    const url = baseUrl + context + time
    console.log("url -> " + url)

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
                title: (movAux.title) ? movAux.title : movAux.original_name,
                date:  ( movAux.release_date ) ? movAux.release_date : movAux.first_air_date ,
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

export async function getBySearch(textToSearch: string, context:string = "search/movie") : Promise<Object>{

   // https://api.themoviedb.org/3/search/movie?api_key=7888561a6eff93666be6d54db238535e&language=es-CO&query=marvel&page=1&include_adult=false

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
                title: (movAux.title) ? movAux.title : movAux.original_name,
                date: ( movAux.release_date ) ? movAux.release_date : movAux.first_air_date ,
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

export async function getById(idMovie: number, context:string = "movie/" ) :Promise<Object>{
    // https://api.themoviedb.org/3/movie/384018?api_key=7888561a6eff93666be6d54db238535e&language=es-CO
    console.log("id - > " + idMovie)
    //const url = baseUrl + context + idMovie
    const url = `${baseUrl + context + idMovie} `

    const params = {
        ...paramsBase
    }
    console.log("url -> " + url)
    let jsonRes: any = {}
    let response: Object = {}
    try {
        const apiGetTest = await axios.get(url,{params:params})
        jsonRes = apiGetTest.data
    }catch (e) {
        console.error("errorrequest -> " + e);
    }

    if (jsonRes){
        const posterImage = await generateUrlImage(jsonRes.poster_path)
        const backgroundImage = await generateUrlImage(jsonRes.backdrop_path, SizeEnum.BIG)
        let movie = {
            id:  jsonRes.id,
            score: jsonRes.vote_average,
            title: jsonRes.title,
            date: jsonRes.release_date,
            resume: jsonRes.overview,
            genre: (jsonRes.genres[0] && jsonRes.genres[0].name) ? jsonRes.genres[0].name : undefined,
            posterImage: posterImage,
            backgroundImage: backgroundImage,
            webUrl: jsonRes.homepage
        }
        response = movie
    }

    return response
}


// others

async function generateUrlImage( imagePath:string, size:SizeEnum = SizeEnum.SMALL ) : Promise<string> {
    if (imagePath) {
        //console.log('generate image url to -> ' + imagePath)
        let imageSizeUrl = sizeImageBig
        imageSizeUrl = (size === SizeEnum.BIG) ? sizeImageBig : sizeImageSmall
        const url = baseUrlImages + imageSizeUrl + '/'
        return url + (imagePath.replace('/', '').replace('\'', ''))
    }
   return undefined
}
