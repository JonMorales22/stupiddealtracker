export interface IParser {
    load(htmlData : string) : void
    getTextFromElement( element : string) : string
}