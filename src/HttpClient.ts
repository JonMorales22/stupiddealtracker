import { IHttpClient } from './IHttpClient'

const axios = require('axios');
const cheerio = require('cheerio');

export class ServerParser implements IHttpClient {
    async fetchUrl(url: string) : Promise<any> {
        return new Promise(async(resolve, reject) => {
            try{
                const { data } = await axios.get(url);
                // return resolve(cheerio.load(data));
                return resolve(data);
            }
            catch(e) {
                return reject(e);
            }
        });
    }
}