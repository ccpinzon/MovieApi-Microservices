import * as movieApi from "../externalApis/movieAPI"
import {timeWindowEnum} from "../models/timeWindow.enum";



export async function testManager(): Promise<Object> {

    const testServiceApi = await movieApi.getTestApi()
    return testServiceApi;
}


export async function getTrendingMovies( time: timeWindowEnum = timeWindowEnum.WEEK, page:number = 1): Promise<Object> {
    const context = "trending/movie/"
    return await movieApi.getTrending(time,page, context)
}



export async function getMoviesBySearch(textToSearch: string ) : Promise<Object> {

    if (textToSearch || textToSearch.length === 0){
        return await movieApi.getBySearch(textToSearch, "search/movie");
    }

    return undefined
    
}


export async function getMovieById(idMovie: number ): Promise<Object> {

    if (idMovie && idMovie > 0){
        return await movieApi.getById(idMovie, "movie/")
    }

    return undefined
}

export async function getTvById(idTv: number): Promise<Object> {
    if (idTv && idTv > 0){
        return await movieApi.getById(idTv, "tv/")
    }
}


export async function getTrendingTv( time: timeWindowEnum = timeWindowEnum.WEEK, page:number = 1): Promise<Object> {
    const context = "trending/tv/"
    return await movieApi.getTrending( time, page , context)
}

export async function getTvsBySearch(textToSearch: string ) : Promise<Object> {

    if (textToSearch || textToSearch.length === 0){
        return await movieApi.getBySearch(textToSearch, "search/tv");
    }

    return undefined

}

