import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from './Modal';

describe('Проверка работы модального окна', () => {
  it('отображение заголовка, кнопок, дочернего элемента', async () => {
    render(
      <Modal
        title="Редактирование"
        confirmButtonText="Редактировать задачу"
        cancelButtonText="Отменить"
        open
        onConfirm={() => {}}
        onClose={() => {}}
      >
        <div>Текст</div>
      </Modal>,
    );

    const element = await screen.getByText('Редактирование');
    expect(element).toBeInTheDocument();

    const confirmButton = await screen.getByText('Редактировать задачу');
    expect(confirmButton).toBeInTheDocument();

    const cancelButton = await screen.getByText('Отменить');
    expect(cancelButton).toBeInTheDocument();

    const child = await screen.getByText('Текст');
    expect(child).toBeTruthy();
  });

  it('работа кнопока', () => {
    const handleConfirm = jest.fn();
    const handleCancel = jest.fn();

    const { getByText } = render(
      <Modal
        title="Редактирование"
        confirmButtonText="Редактировать задачу"
        cancelButtonText="Отменить"
        open
        onConfirm={handleConfirm}
        onClose={handleCancel}
      >
        <div>Текст</div>
      </Modal>,
    );

    fireEvent.click(getByText('Редактировать задачу'));
    fireEvent.click(getByText('Отменить'));

    expect(handleConfirm).toHaveBeenCalledTimes(1);
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
