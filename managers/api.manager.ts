import * as movieApi from "../externalApis/movieAPI"
import {timeWindowEnum} from "../models/timeWindow.enum";

export async function testManager(): Promise<Object> {

    const testServiceApi = await movieApi.getTestApi()
    return testServiceApi;
}


export async function getTrendingMovies( time: timeWindowEnum = timeWindowEnum.WEEK, page:number = 1): Promise<Object> {
    return await movieApi.getTrendingMovies(time,page)
}



