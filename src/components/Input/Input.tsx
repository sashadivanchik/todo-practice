import React, { useState } from "react";
import { TodoInputProps } from "./types";

export const Input: React.FC<TodoInputProps> = ({
  onClick,
  placeholder= ''
}) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <button type="submit">Добавить</button>
    </form>
  )
};