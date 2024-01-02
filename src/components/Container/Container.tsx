import React from 'react';
import classNames from 'classnames';
import { ContainerProps } from './types';
import styles from './Container.module.css';

export const Container: React.FC<ContainerProps> = ({
  children,
  styleName,
}) => {
  const classes = classNames(styles.container, styleName);

  return (
    <div
      className={classes}
    >
      {children}
    </div>
  );
};
