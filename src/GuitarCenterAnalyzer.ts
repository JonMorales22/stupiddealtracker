import { IAnalyzer } from './IAnalyzer';
import { PriceDataExtractor } from './PriceDataExtractor';

const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.guitarcenter.com/Daily-Pick.gc';

const priceDataElements = {
    newPrice: '.dailypick-price',
    savings: '.dailypick-save',
    originalPrice: '.price-display-value'
}

export class GuitarCenterAnalyzer implements IAnalyzer {
    async fetchUrl() : Promise<any> {
        return new Promise(async(resolve, reject) => {
            try{
                const { data } = await axios.get(url);
                return resolve(cheerio.load(data));
            }
            catch(e) {
                return reject(e);
            }
        });
    }

    async getData(): Promise<StupidDealData> {
        return new Promise(async(resolve, reject) => {
            try{
                const $ = await this.fetchUrl(); 
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