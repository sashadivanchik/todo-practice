import React from 'react';
import { Modal as AntModal } from 'antd';
import { ModalProps } from './types';
import { Button } from '../Button/Button';
import './Modal.css';

export const Modal: React.FC<ModalProps> = ({
  title = '',
  cancelButtonText,
  confirmButtonText,
  open,
  children,
  onConfirm,
  onClose,
}) => (
  <AntModal
    title={title}
    open={open}
    closable={false}
    maskClosable={false}
    keyboard={false}
    okText={confirmButtonText}
    cancelText={cancelButtonText}
    footer={[
      <Button key="1" text={cancelButtonText} onClick={onClose} />,
      <Button key="2" text={confirmButtonText} onClick={onConfirm} />,
    ]}
    className="modalContainer"
  >
    {children}
  </AntModal>
);
