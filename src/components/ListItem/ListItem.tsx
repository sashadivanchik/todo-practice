import React from "react";
import { TodoProps } from "../state/types";
import { Button } from "../Button/Button";
import styles from "./ListItem.module.css";
import classNames from "classnames";

export interface ListItemProps extends TodoProps {
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  styleName?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  id,
  isComplete,
  description,
  styleName,
  onToggle,
  onRemove
}) => {
  const toggleMessage = isComplete ? 'В работу' : 'Завершить';
  const isCompleteStyle = isComplete ? styles.isComplete : '';

  const classes = classNames(styles.listItemContainer, styleName);
  const descriptionClasses = classNames(styles.listItemMessage, isCompleteStyle);

  return (
    <div className={classes}>

      <div className={styles.buttonsContainer}>
        <Button
          styleName={styles.deleteButton}
          onClick={() => onRemove(id)}
          text={"Удалить"}
        />
        <Button
          styleName={styles.toggleButton}
          onClick={() => onToggle(id)}
          text={toggleMessage}
        />
      </div>

      <div className={descriptionClasses}>
          {description}
      </div>

    </div>
  )
};