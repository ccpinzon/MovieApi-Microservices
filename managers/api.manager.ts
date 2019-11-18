import {getTestApi} from "../externalApis/movieAPI"

export async function testManager(): Promise<Object> {

    const testServiceApi = await getTestApi()
    return testServiceApi;
}



