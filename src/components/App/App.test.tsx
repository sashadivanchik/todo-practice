import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { App } from './App';

describe('Отображение списка дел', () => {
  it('заголовок', () => {
    render(<App />);
    const element = screen.getByText('Список дел');
    expect(element).toBeInTheDocument();
  });

  it('поле ввода', () => {
    render(<App />);
    const element = screen.getByPlaceholderText('что нужно сделать');
    expect(element).toBeInTheDocument();
  });

  it('кнопка добавить', () => {
    render(<App />);
    const element = screen.getByText('Добавить');
    expect(element).toBeInTheDocument();
  });

  it('сообщение если список дел пуст', () => {
    render(<App />);
    const element = screen.getByText('Список пуст');
    expect(element).toBeInTheDocument();
  });
});

const setup = () => {
  const utils = render(<App />);
  const input = screen.getByPlaceholderText('что нужно сделать') as HTMLInputElement;
  const addButton = screen.getByText('Добавить');

  return {
    input,
    addButton,
    ...utils,
  };
};

describe('Проверка работы, c одной задачей', () => {
  it('добавление, завершение, удаление задачи', async () => {
    const { input, addButton } = setup();

    fireEvent.change(input, { target: { value: 'Купить продукты' } });

    expect(input.value).toBe('Купить продукты');

    fireEvent.click(addButton);

    const element = await screen.getByText('Купить продукты');
    expect(element).toBeInTheDocument();

    const deleteButton = await screen.getByText('Удалить');
    expect(deleteButton).toBeInTheDocument();

    const toggleButtonToEndStatus = await screen.getByText('Завершить');
    expect(toggleButtonToEndStatus).toBeInTheDocument();

    fireEvent.click(toggleButtonToEndStatus);

    const toggleButtonInWorkStatus = await screen.getByText('В работу');
    expect(toggleButtonInWorkStatus).toBeInTheDocument();

    fireEvent.click(deleteButton);

    const emptyList = screen.getByText('Список пуст');
    expect(emptyList).toBeInTheDocument();
  });
});

describe('Проверка работы, c тремя задачами', () => {
  it('добавление и удаление трех задач', async () => {
    const { input, addButton } = setup();

    fireEvent.change(input, { target: { value: 'Купить продукты' } });

    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: 'Прибраться' } });

    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: 'Вынести мусор' } });

    fireEvent.click(addButton);

    const task1 = await screen.getByText('Купить продукты');
    expect(task1).toBeInTheDocument();

    const task2 = await screen.getByText('Прибраться');
    expect(task2).toBeInTheDocument();

    const task3 = await screen.getByText('Вынести мусор');
    expect(task3).toBeInTheDocument();

    const deleteButtons = await screen.getAllByText('Удалить');
    expect(deleteButtons.length).toBe(3);

    deleteButtons.forEach((button) => {
      fireEvent.click(button);
    });

    const emptyList = screen.getByText('Список пуст');
    expect(emptyList).toBeInTheDocument();
  });
});
