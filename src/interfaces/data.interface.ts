export enum OptionEnum {
    USD = "USD",
    EUR = "EUR",
    UAH = "UAH",
  }
  export interface Option {
    value: string | number;
    label: string;
  }

export interface CurrencyItem {
    ccy:  string,
    base_ccy: string,
    buy: number,
    sale: number
}
