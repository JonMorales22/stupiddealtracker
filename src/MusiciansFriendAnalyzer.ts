const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.musiciansfriend.com/stupid'
const moneyRegex = new RegExp('\\${1}\\d*\.{1}\\d{2}', 'i')

export class MusiciansFriendAnalyzer {
    searchList: string[]
    constructor(public words) {
        this.searchList=words;
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
                const priceData = this.getPriceData($)
                return resolve ({
                    title: this.getTextFromElement($, '#feature-right > .feature-title'), //$('#feature-right > .feature-title').text().trim(),
                    description : this.getTextFromElement($, '#feature-right > .feature-description'), //$('#feature-right > .feature-description').text().trim(),
                    price: priceData
                })
            }
            catch(e){
                reject(e);
            }
        })
    }

    //gets ".feature-save" node from cheerio and then uses regex to pull out the price information
    getPriceData($) : PriceData {
        // const savings = $('.feature-save').text().trim();
        // const newPrice = $('.feature-price').text().trim();
        const savings = this.getTextFromElement($, '.feature-save');
        const newPrice = this.getTextFromElement($, '.feature-price');
        return {
            // originalPrice: $('.regular-price').text().trim(),
            originalPrice: this.parseMoneyToNumber(this.getTextFromElement($, '.regular-price')),
            newPrice: this.getDollarString(newPrice),
            savings: this.getDollarString(savings)
        }
    }

    getTextFromElement($, htmlElement) {
        return $(htmlElement).text().trim();
    }

    getDollarString(stuff : string) {
        const money = moneyRegex.exec(stuff);
        return money == null ? null : this.parseMoneyToNumber(money[0])
    }

    //input =  "$45.66". method will cut out the dollar sign and parse the rest into number
    parseMoneyToNumber(stringToParse : string) : number {
        return parseFloat(stringToParse.substring(1));
    }
}