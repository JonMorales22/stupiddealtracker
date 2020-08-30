import { PriceDataElements } from "./PriceDataElements";
import { IParser } from "./IParser"

const moneyRegex = new RegExp('\\${1}\\d*\.{1}\\d{2}', 'i')

export class PriceDataExtractor {
    parser: IParser
    constructor(parser: IParser) {
        this.parser = parser
    }

    getPriceData(priceDataElements: PriceDataElements) : PriceData {
        const savings = this.parser.getTextFromElement(priceDataElements.savings);
        const newPrice = this.parser.getTextFromElement(priceDataElements.newPrice);
        return {
            originalPrice: this.parseMoneyToNumber(this.parser.getTextFromElement(priceDataElements.originalPrice)),
            newPrice: this.getDollarString(newPrice),
            savings: this.getDollarString(savings)
        }
    }

    getPriceDataOld(priceDataElements: PriceDataElements, $) : PriceData {
        const savings = this.parser.getTextFromElement(priceDataElements.savings);
        const newPrice = this.parser.getTextFromElement(priceDataElements.newPrice);
        return {
            originalPrice: this.parseMoneyToNumber(this.parser.getTextFromElement(priceDataElements.originalPrice)),
            newPrice: this.getDollarString(newPrice),
            savings: this.getDollarString(savings)
        }
    }

    getDollarString(stuff : string) {
        const money = moneyRegex.exec(stuff);
        return money == null ? null : this.parseMoneyToNumber(money[0])
    }

    //input =  "$45.66". method will cut out the dollar sign and parse the rest into number
    parseMoneyToNumber(stringToParse : string) : number {
        return parseFloat(stringToParse.substring(1));
    }

    static getTextFromElement($, htmlElement) : string {
        return $(htmlElement).text().trim();
    }
}

