import { IAnalyzer } from './IAnalyzer';
import { PriceDataExtractor } from './PriceDataExtractor';

const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.musiciansfriend.com/stupid'

const priceDataElements = {
    savings: '.feature-save',
    newPrice: '.feature-price',
    originalPrice: '.regular-price'
}

export class MusiciansFriendAnalyzer implements IAnalyzer{
    priceDataExtractor: PriceDataExtractor
    constructor() {
        this.priceDataExtractor = new PriceDataExtractor();
    }

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

    async getData(): Promise<SavingsData> {
        return new Promise(async(resolve, reject) => {
            try{
                const $ = await this.fetchUrl(); 
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