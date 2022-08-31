export enum CCYEnum {
    "USD", "EUR", "RUR", "BTC"
}

export enum BaseCCYEnum {
    "UAH", 
}

export interface CurrencyItem {
    ccy: CCYEnum | string,
    base_ccy: BaseCCYEnum | string,
    buy: number,
    sale: number
}
