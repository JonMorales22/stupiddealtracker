import { IAnalyzer } from './IAnalyzer';
import { PriceDataExtractor } from './PriceDataExtractor';
import { IHttpClient } from './IHttpClient';
import { IParser } from './IParser';

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
    parser: IParser
    constructor(httpClient: IHttpClient, parser: IParser) {
        this.httpClient = httpClient;
        this.parser = parser;
        this.priceDataExtractor = new PriceDataExtractor(this.parser);
    }

    async getData(): Promise<SavingsData> {
        return new Promise(async(resolve, reject) => {
            try{
                this.parser.load(await this.httpClient.fetchUrl(url)); 
                const priceData = this.priceDataExtractor.getPriceData(priceDataElements);
                return resolve ({
                    title: this.parser.getTextFromElement('.displayNameColor'), 
                    description : this.parser.getTextFromElement('.dailypick-description.truncated'),
                    price: priceData
                })
            }
            catch(e){
                reject(e);
            }
        })
    }
}