import React from 'react';
import { Input } from 'antd';
import { TextFieldProps } from './types';

const { TextArea } = Input;

export const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  dataTestId,
}) => (
  <TextArea
    data-testid={dataTestId}
    rows={8}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);
