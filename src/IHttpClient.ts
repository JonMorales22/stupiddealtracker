export interface IHttpClient {
    fetchUrl(url : string) : Promise<any> 
}