import React from "react";
import styles from "./convertItem.module.scss";
import Select from "react-select";
import { Option } from "../../../interfaces/data.interface";

interface IConvertItem {
  value: string|number;
  resetInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (selectedOption:Option | null)=>void;
  options: Option[] | null;
  currency: Option | null;
}
const ConvertItem = ({
  value,
  resetInput,
  handleChangeInput,
  handleSelectChange,
  options,
  currency,
}: IConvertItem) => {
  return (
    <>
      {options ? (
        <div className={styles.row}>
          <input
            value={value}
            onChange={handleChangeInput}
            className={styles.input}
            type="number"
            min="0"
            onFocus={resetInput}
          />
          <div className={styles.dropdownWrap}>
            <Select
              options={options}
              onChange={handleSelectChange}
              value={currency}
              className={styles.dropdown}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ConvertItem;
