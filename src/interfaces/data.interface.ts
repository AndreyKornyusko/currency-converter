export enum CCYEnum {
    "USD", "EUR", "RUR", "BTC"
}

export enum BaseCCYEnum {
    "UAH", 
}

export interface CurrencyItem {
    ccy: CCYEnum,
    base_ccy: BaseCCYEnum,
    buy: number,
    sale: number
}
