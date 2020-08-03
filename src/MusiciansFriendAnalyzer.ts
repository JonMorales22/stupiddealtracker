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

    async getMusiciansFriendData(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try{
                const $ = await this.fetchUrl(); 
                const priceData = this.getPriceData($)
                return resolve ({
                    'title': $('#feature-right > .feature-title').text().trim(),
                    'description' : $('#feature-right > .feature-description').text().trim().toLowerCase(),
                    'price': priceData
                })
            }
            catch(e){
                reject(e);
            }
        })
    }

    getPriceData($) {
        const savings = $('.feature-save').text().trim();
        const newPrice = $('.feature-price').text().trim();
        return {
            originalPrice: $('.regular-price').text().trim(),
            newPrice: moneyRegex.exec(newPrice)==null ? null : moneyRegex.exec(newPrice)[0],
            savings: moneyRegex.exec(savings) == null ? null : moneyRegex.exec(savings)[0]
        }
    }

    searchData(data) {
        for(let i=0;i<this.searchList.length;i++) {
            if(data.includes(this.searchList[i]))
                return true;
        }
    
        return false;
    }
}