import React from 'react';

export type ModalProps = {
  open: boolean;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  children: string | React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
};
