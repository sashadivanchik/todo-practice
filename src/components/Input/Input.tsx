import React from 'react';
import { Input as AntInput } from 'antd';
import classNames from 'classnames';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value = '',
  styleName,
  onChange,
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
  );
};
