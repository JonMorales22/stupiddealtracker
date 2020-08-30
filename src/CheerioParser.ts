import { IParser } from './IParser'

const cheerio = require('cheerio');

export class CheerioParser implements IParser {
    $ : any
    load(htmlData : string) {
       this.$ = cheerio.load(htmlData)
    }

    getTextFromElement(htmlElement: string) {
        return this.$(htmlElement).text().trim();
    }
}