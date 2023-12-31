import React from "react";
import { Input as AntInput } from "antd";
import { InputProps } from "./types";
import classNames from "classnames";

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value= "",
  styleName,
  onChange
}) => {

  const classes = classNames(styleName);

  return (
    <AntInput
      className={classes}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
};