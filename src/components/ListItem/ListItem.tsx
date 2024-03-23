import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from '../Button/Button';
import styles from './ListItem.module.css';
import { TodoProps } from '../../store/state/types';
import { Modal } from '../Modal/Modal';
import { TextField } from '../TextArea/TextArea';

export interface ListItemProps extends TodoProps {
  onRemove: (id: number) => void;
  onToggle: (id: number, handleToggle: boolean) => void;
  onEdit: (id: number, value: string) => void
  styleName?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  id,
  isComplete,
  description,
  styleName,
  onToggle,
  onRemove,
  onEdit,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(description || '');

  const toggleMessage = isComplete ? 'В работу' : 'Завершить';
  const isCompleteStyle = isComplete ? styles.isComplete : '';

  const classes = classNames(styles.listItemContainer, styleName);
  const descriptionClasses = classNames(styles.listItemMessage, isCompleteStyle);

  const handleCancel = () => {
    setOpen(false);
    setValue(description);
  };

  const handleConfirm = () => {
    if (value) {
      onEdit(id, value);
      setOpen(false);
    }
  };

  return (
    <div className={classes}>

      <div className={styles.buttonsContainer}>
        <Button
          onClick={() => onRemove(id)}
          text="Удалить"
        />
        <Button
          onClick={() => onToggle(id, isComplete)}
          text={toggleMessage}
        />

        <Button
          onClick={() => setOpen(true)}
          text="Редактировать"
        />
      </div>

      <div className={descriptionClasses}>
        { description }
      </div>

      <Modal
        title="Редактирование"
        confirmButtonText="Редактировать задачу"
        cancelButtonText="Отменить"
        open={open}
        onConfirm={handleConfirm}
        onClose={handleCancel}
      >
        <TextField
          value={value}
          onChange={setValue}
          dataTestId="edit-textarea"
        />
      </Modal>

    </div>
  );
};
