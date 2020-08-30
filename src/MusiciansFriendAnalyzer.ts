import { IAnalyzer } from './IAnalyzer';
import { IHttpClient } from './IHttpClient';
import { IParser } from './IParser';
import { PriceDataExtractor } from './PriceDataExtractor';

const url = 'https://www.musiciansfriend.com/stupid'

//defines the htmlElements on the webpage that store the related data
const priceDataElements = {
    savings: '.feature-save',
    newPrice: '.feature-price',
    originalPrice: '.regular-price'
}

export class MusiciansFriendAnalyzer implements IAnalyzer{
    priceDataExtractor: PriceDataExtractor
    httpClient: IHttpClient
    parser: IParser
    constructor(httpClient: IHttpClient, parser: IParser) {
        this.httpClient =  httpClient;
        this.parser = parser;
        this.priceDataExtractor = new PriceDataExtractor(this.parser);
    }

    async getData(): Promise<SavingsData> {
        return new Promise(async(resolve, reject) => {
            try{
                this.parser.load(await this.httpClient.fetchUrl(url)); 
                const priceData = this.priceDataExtractor.getPriceData(priceDataElements)
                return resolve ({
                    source: 'Musicians Friend',
                    title: this.parser.getTextFromElement('#feature-right > .feature-title'), 
                    description : this.parser.getTextFromElement('#feature-right > .feature-description'),
                    price: priceData
                })
            }
            catch(e){
                reject(e);
            }
        })
    }
}