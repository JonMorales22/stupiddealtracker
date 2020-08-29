import { IAnalyzer } from './IAnalyzer';
import { PriceDataExtractor } from './PriceDataExtractor';
import { IHttpClient } from './IHttpClient';

const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.guitarcenter.com/Daily-Pick.gc';

const priceDataElements = {
    newPrice: '.dailypick-price',
    savings: '.dailypick-save',
    originalPrice: '.price-display-value'
}

export class GuitarCenterAnalyzer implements IAnalyzer {
    priceDataExtractor: PriceDataExtractor
    httpClient: IHttpClient
    constructor(httpClient: IHttpClient) {
        this.httpClient = httpClient;
    }

    async getData(): Promise<SavingsData> {
        return new Promise(async(resolve, reject) => {
            try{
                const $ = cheerio.load(await this.httpClient.fetchUrl(url)); 
                const priceData = new PriceDataExtractor().getPriceData($, priceDataElements);
                return resolve ({
                    title: PriceDataExtractor.getTextFromElement($, '.displayNameColor'), 
                    description : PriceDataExtractor.getTextFromElement($, '.dailypick-description.truncated'),
                    price: priceData
                })
            }
            catch(e){
                reject(e);
            }
        })
    }
}