import React from 'react';
import { Spin } from 'antd';
import styles from './Loading.module.css';

export const Loading: React.FC = () => (
  <div className={styles.loading}>
    <Spin size="large" />
  </div>
);
