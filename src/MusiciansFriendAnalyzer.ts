import { IAnalyzer } from './IAnalyzer';
import { IHttpClient } from './IHttpClient';
import { PriceDataExtractor } from './PriceDataExtractor';

const cheerio = require('cheerio');
const url = 'https://www.musiciansfriend.com/stupid'

const priceDataElements = {
    savings: '.feature-save',
    newPrice: '.feature-price',
    originalPrice: '.regular-price'
}

export class MusiciansFriendAnalyzer implements IAnalyzer{
    priceDataExtractor: PriceDataExtractor
    httpClient: IHttpClient
    constructor(httpClient: IHttpClient) {
        this.priceDataExtractor = new PriceDataExtractor();
        this.httpClient =  httpClient;
    }

    async getData(): Promise<SavingsData> {
        return new Promise(async(resolve, reject) => {
            try{
                const $ = cheerio.load(await this.httpClient.fetchUrl(url)); 
                const priceData = this.priceDataExtractor.getPriceData($, priceDataElements)
                return resolve ({
                    title: PriceDataExtractor.getTextFromElement($, '#feature-right > .feature-title'), 
                    description : PriceDataExtractor.getTextFromElement($, '#feature-right > .feature-description'),
                    price: priceData
                })
            }
            catch(e){
                reject(e);
            }
        })
    }
}