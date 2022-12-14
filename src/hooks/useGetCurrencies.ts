import { useEffect, useState } from "react";
import axios from "axios";
import { CurrencyItem } from "../interfaces/data.interface";
export function useGetCurrencies() {
  const [data, setData] = useState<CurrencyItem[] | null>(null);
  useEffect(() => {
    axios
      .get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then(({ data }) => {
        if (data?.length) {
          //@ts-ignore
          const filteredData = data.filter((item) => item?.base_ccy === "UAH");
          setData(filteredData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return data;
}
