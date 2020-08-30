import { PriceDataElements } from "./PriceDataElements";
import { IParser } from "./IParser"

//looks for a money sign ($) -> followed by N numbers -> followed by a period (.) -> followed by 2 numbers
// ex: $42.11, $123098.12
// this WILL break if the website puts commas in a number (ie: $1,000.00)
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
            originalPrice: this.parseMoneyStringToNumber(this.parser.getTextFromElement(priceDataElements.originalPrice)),
            newPrice: this.getMoneyAsNumber(newPrice),
            savings: this.getMoneyAsNumber(savings)
        }
    }

    //takes in a string and performs regex operation to pull out a 'money string'
    getMoneyAsNumber(stuff : string) {
        const money = moneyRegex.exec(stuff);
        return money == null ? null : this.parseMoneyStringToNumber(money[0])
    }

    //if input =  $45.66. method will cut out the dollar sign and parse the rest into number
    parseMoneyStringToNumber(stringToParse : string) : number {
        return parseFloat(stringToParse.substring(1));
    }
}

