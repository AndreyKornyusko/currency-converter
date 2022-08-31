import React, { useEffect, useState } from "react";
import styles from "./converter.module.scss";
import { useGetCurrencies } from "../../hooks/useGetCurrencies";
import { OptionEnum, Option } from "../../interfaces/data.interface";
import ConvertItem from "./convertItem/convertItem";
enum DirectionEnum {
  fromV1ToV2 = "fromV1ToV2",
  fromV2ToV1 = "fromV2ToV1",
}

const Converter = () => {
  const data = useGetCurrencies();
  const UAHRate = 1;
  const [options, setOptions] = useState<Option[] | null>(null);
  const [USDRate, setUSDRate] = useState(1);
  const [currency1, setCurrency1] = useState<Option | null>({
    value: UAHRate,
    label: OptionEnum.UAH,
  });
  const [currency2, setCurrency2] = useState<Option | null>({
    value: USDRate,
    label: OptionEnum.USD,
  });
  const [value1, setValue1] = useState<number | string>("");
  const [value2, setValue2] = useState<number | string>("");
  const [direction, setDirection] = useState<DirectionEnum>(
    DirectionEnum.fromV1ToV2
  );
  useEffect(() => {
    if (data?.length) {
      let options: Option[] = [];
      data.forEach((item) => {
        options.push({ value: item?.sale, label: item?.ccy });
      });
      if (options?.length) {
        options.push({ value: 1, label: OptionEnum.UAH });
        setOptions(options);
      }
    }
  }, [data]);
  useEffect(() => {
    if (data?.length) {
      const usd = data.find((item) => item?.ccy === OptionEnum.USD);
      if (usd) {
        setUSDRate(usd.sale);
        setCurrency2({ value: usd?.sale, label: OptionEnum.USD });
      }
    }
  }, [data]);

  useEffect(() => {
    const rate1 = Number(currency1?.value);
    const rate2 = Number(currency2?.value);
    if (
      typeof rate1 === "number" &&
      typeof rate2 === "number" &&
      direction === DirectionEnum.fromV1ToV2
    ) {
      const rate = rate1 / rate2;
      if (value1 && !isNaN(Number(value1) * rate)) {
        setValue2((Number(value1) * rate).toFixed(2));
      } else {
        setValue2("");
      }
    }
    if (
      typeof rate1 === "number" &&
      typeof rate2 === "number" &&
      direction === DirectionEnum.fromV2ToV1
    ) {
      const rate = rate2 / rate1;
      if (value2 && !isNaN(Number(value2) * rate)) {
        setValue1((Number(value2) * rate).toFixed(2));
      } else {
        setValue1("");
      }
    }
  }, [direction, currency1, currency2, value1, value2]);

  const handleChangeInput1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(e.target.value);
    setDirection(DirectionEnum.fromV1ToV2);
  };
  const handleChangeInput2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue2(e.target.value);
    setDirection(DirectionEnum.fromV2ToV1);
  };
  const resetInput1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      setValue1("");
    }
  };
  const resetInput2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      setValue2("");
    }
  };

  return (
    <div className={styles.converter}>
      <h1 className={styles.title}>Currency converter</h1>
      {options ? (
        <div className={styles.converterWrap}>
          <ConvertItem
            value={value1}
            handleChangeInput={handleChangeInput1}
            resetInput={resetInput1}
            options={options}
            handleSelectChange={(selectedOption) => {
              setCurrency1(selectedOption);
            }}
            currency={currency1}
          />
          <ConvertItem
            value={value2}
            handleChangeInput={handleChangeInput2}
            resetInput={resetInput2}
            options={options}
            handleSelectChange={(selectedOption) => {
              setCurrency2(selectedOption);
            }}
            currency={currency2}
          />
        </div>
      ) : (
        <h3 className={styles.error}>Sorry, can't get data from server. Please reload the page</h3>
      )}
    </div>
  );
};

export default Converter;
