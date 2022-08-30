import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./converter.module.scss";
import { CurrencyItem } from "../../interfaces/data.interface";
import Select from "react-select";

enum DirectionEnum {
  fromV1ToV2 = "fromV1ToV2",
  fromV2ToV1 = "fromV2ToV1",
}
enum OptionEnum {
  USD = "USD",
  EUR = "EUR",
  UAH = "UAH",
}
interface Option {
  value: OptionEnum;
  label: OptionEnum;
}
const Converter = () => {
  const options = [
    { value: OptionEnum.UAH, label: OptionEnum.UAH },
    { value: OptionEnum.USD, label: OptionEnum.USD },
    { value: OptionEnum.EUR, label: OptionEnum.EUR },
  ];
  const UAHRate = 1;
  const [EURRate, setEURRate] = useState(1);
  const [USDRate, setUSDRate] = useState(1);
  const [currency1, setCurrency1] = useState<Option|null>({
    value: OptionEnum.UAH,
    label: OptionEnum.UAH,
  });
  const [currency2, setCurrency2] = useState<Option|null>({
    value: OptionEnum.USD,
    label: OptionEnum.USD,
  });
  const [value1, setValue1] = useState<number|string>('');
  const [value2, setValue2] = useState<number|string>('');
  const [direction, setDirection] = useState<DirectionEnum>(
    DirectionEnum.fromV1ToV2
  );
  useEffect(() => {
    axios
      .get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then(({ data }) => {
        if (data?.length) {
          //@ts-ignore
          const usd = data.find((item) => item?.ccy === OptionEnum.USD);
          if (usd) {
            setUSDRate(usd.sale);
          }
          //@ts-ignore
          const eur = data.find((item) => item?.ccy === OptionEnum.EUR);
          if (eur) {
            setEURRate(eur.sale);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let rate1 = 1;
    let rate2 = 1;
    if (currency1?.value === OptionEnum.UAH) {
      rate1 = UAHRate;
    }
    if (currency1?.value === OptionEnum.USD) {
      rate1 = USDRate;
    }
    if (currency1?.value === OptionEnum.EUR) {
      rate1 = EURRate;
    }

    if (currency2?.value === OptionEnum.EUR) {
      rate2 = EURRate;
    }
    if (currency2?.value === OptionEnum.UAH) {
      rate2 = UAHRate;
    }
    if (currency2?.value === OptionEnum.USD) {
      rate2 = USDRate;
    }
    if (direction === DirectionEnum.fromV1ToV2) {
      const rate = rate1 / rate2;
      if (value1&&!isNaN(Number(value1) * rate)) {
        setValue2(((Number(value1) * rate).toFixed(2)));
      }
       else {
        setValue2('');
      }
    }
    if (direction === DirectionEnum.fromV2ToV1) {
      const rate = rate2 / rate1;
      if (value2&&!isNaN(Number(value2) * rate)) {
        setValue1(((Number(value2) * rate).toFixed(2)));
      } 
      else {
        setValue1('');
      }
    }
  }, [direction, currency1, currency2, value1, value2]);

  const handleChangeInput1 = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue1(e.target.value)
      setDirection(DirectionEnum.fromV1ToV2);
  };
  const handleChangeInput2 = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue2(e.target.value)
      setDirection(DirectionEnum.fromV2ToV1);
  };
  const resetInput1 = (e:React.ChangeEvent<HTMLInputElement>)=> {
    if(e.target.value==='0'){
      setValue1('')
    }
  }
  const resetInput2 = (e:React.ChangeEvent<HTMLInputElement>)=> {
    if(e.target.value==='0'){
      setValue2('')
    }
   }
 
  return (
    <div className={styles.converter}>
      <h1 className={styles.title}>Currency converter</h1>
      <div className={styles.converterWrap}>
      <div className={styles.row}>
        <input
          value={value1}
          onChange={handleChangeInput1}
          className={styles.input}
          type="number"
          min="0"
          onFocus={resetInput1}
        />
        <div className={styles.dropdownWrap}>
          <Select
            options={options}
            onChange={(selectedOption) => {
              setCurrency1(selectedOption);
            }}
            value={currency1}
            className={styles.dropdown}
          />
        </div>
      </div>
      <div className={styles.row}>
        <input
          value={value2}
          onChange={handleChangeInput2}
          className={styles.input}
          type="number"
          min="0"
          onFocus={resetInput2}
        />
        <div className={styles.dropdownWrap}>
          <Select
            options={options}
            onChange={(selectedOption) => {
              setCurrency2(selectedOption);
            }}
            value={currency2}
            className={styles.dropdown}
          />
        </div>
      </div>

      </div>
    </div>
  );
};

export default Converter;
