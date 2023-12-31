import React, { useState } from "react";
import { TodoInputProps } from "./types";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./Form.module.css";

export const Form: React.FC<TodoInputProps> = ({
  onClick,
  placeholder= ''
}) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (value: string) => {
    setValue(value)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value) {
      return
    }

    onClick(value)
    setValue('')
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          styleName={styles.formInput}
        />
        <Button
          text={"Добавить"}
          htmlType="submit"
        />
      </form>
    </div>
  )
};