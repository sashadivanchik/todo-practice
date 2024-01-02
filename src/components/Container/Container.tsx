import React from "react";
import { ContainerProps } from "./types";
import styles from "./Container.module.css";
import classNames from "classnames";

export const Container: React.FC<ContainerProps> = ({
  children,
  styleName
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
