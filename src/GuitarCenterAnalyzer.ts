import { IAnalyzer } from './IAnalyzer';
import { IHttpClient } from './IHttpClient';
import { IParser } from './IParser';
import { PriceDataExtractor } from './PriceDataExtractor';

const url = 'https://www.guitarcenter.com/Daily-Pick.gc';

//defines the htmlElements on the webpage that store the related data
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
                    source: 'Guitar Center',
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