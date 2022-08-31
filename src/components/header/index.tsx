import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { CurrencyItem } from "../../interfaces/data.interface";
import {useGetCurrencies} from '../../hooks/useGetCurrencies'
const Header = () => {
  const [USD, setUSD] = useState<CurrencyItem | null>(null);
  const [EUR, setEUR] = useState<CurrencyItem | null>(null);
  const data = useGetCurrencies()

  useEffect(() => {
    if (data?.length) {
      const usd = data.find((item) => item?.ccy === "USD");
      if (usd) {
        setUSD(usd);
      }
      const eur = data.find((item) => item?.ccy === "EUR");
      if (eur) {
        setEUR(eur);
      }
    }
}, [data])

  return (
    <div className={styles.header}>
      <div className={styles.table}>
      {USD && (
        <div className={styles.row}>
          <span className={styles.currency}>USD:</span> buy <span className={styles.numbers}>{Number(USD?.buy).toFixed(2)}</span> sale <span className={styles.numbers}>{Number(USD?.sale).toFixed(2)}</span>
        </div>
      )}
      {EUR && (
        <div className={styles.row}>
          <span className={styles.currency}>EUR:</span> buy <span className={styles.numbers}>{Number(EUR?.buy).toFixed(2)}</span> sale <span className={styles.numbers}>{Number(EUR?.sale).toFixed(2)}</span>
        </div>
      )}

      </div>
    </div>
  );
};

export default Header;
