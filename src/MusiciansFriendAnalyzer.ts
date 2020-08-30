import { IAnalyzer } from './IAnalyzer';
import { IHttpClient } from './IHttpClient';
import { PriceDataExtractor } from './PriceDataExtractor';
import { IParser } from './IParser';
import { CheerioParser } from './CheerioParser';

const url = 'https://www.musiciansfriend.com/stupid'

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