import React from 'react';
import { Input } from 'antd';
import { TextFieldProps } from './types';

const { TextArea } = Input;

export const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
}) => (
  <TextArea
    rows={8}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);
