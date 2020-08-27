import { PriceDataExtractor } from './PriceDataExtractor';

const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.musiciansfriend.com/stupid'

export class MusiciansFriendAnalyzer {
    searchList: string[]
    priceDataExtractor: PriceDataExtractor
    constructor(words: string[]) {
        this.searchList=words;
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

    async getMusiciansFriendData(): Promise<StupidDealData> {
        return new Promise(async(resolve, reject) => {
            try{
                const $ = await this.fetchUrl(); 
                const priceData = this.priceDataExtractor.getPriceData($)
                return resolve ({
                    title: PriceDataExtractor.getTextFromElement($, '#feature-right > .feature-title'), //$('#feature-right > .feature-title').text().trim(),
                    description : PriceDataExtractor.getTextFromElement($, '#feature-right > .feature-description'), //$('#feature-right > .feature-description').text().trim(),
                    price: priceData
                })
            }
            catch(e){
                reject(e);
            }
        })
    }
}