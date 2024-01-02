import React from "react";
import { Button as AntButton } from "antd";
import { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = ({
  onClick,
  text = "",
  styleName ,
  htmlType
  }) => {
    return (
      <AntButton
        htmlType={htmlType}
        className={styleName}
        onClick={onClick}
      >
        {text}
      </AntButton>);
};
