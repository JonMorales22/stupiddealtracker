const moneyRegex = new RegExp('\\${1}\\d*\.{1}\\d{2}', 'i')

export class PriceDataExtractor {
    //gets ".feature-save" node from cheerio and then uses regex to pull out the price information
    getPriceData($) : PriceData {
        const savings = PriceDataExtractor.getTextFromElement($, '.feature-save');
        const newPrice = PriceDataExtractor.getTextFromElement($, '.feature-price');
        return {
            originalPrice: this.parseMoneyToNumber(PriceDataExtractor.getTextFromElement($, '.regular-price')),
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

    static getTextFromElement($, htmlElement) {
        return $(htmlElement).text().trim();
    }
}