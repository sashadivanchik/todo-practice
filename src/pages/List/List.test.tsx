import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { List } from './List';

const url = 'http://localhost:7000/api/todos/getTodos?page=1&limitItems=10';
const params = { headers: { 'Content-Type': 'application/json;charset=utf-8' }, method: 'GET' };

describe('Отображение елемента списка: ', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Рендерим один элемент', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({
        count: 1,
        items: [{
          id: 1,
          description: 'Купить хлеб',
          isComplete: false,
        }],
      }),
    });

    render(<List />);

    // Ждем, пока данные будут загружены и отображены
    await waitFor(() => {
      expect(screen.getByText('Купить хлеб')).toBeInTheDocument();
    });

    // Проверяем, что fetch был вызван с правильным URL
    expect(global.fetch).toHaveBeenCalledWith(url, params);
  });

  test('Рендерим несколько элементов', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({
        count: 3,
        items: [{
          id: 1,
          description: 'Купить хлеб',
          isComplete: false,
        },
        {
          id: 2,
          description: 'Купить масло',
          isComplete: false,
        },
        {
          id: 3,
          description: 'Купить колбасу',
          isComplete: false,
        }],
      }),
    });

    render(<List />);

    // Ждем, пока данные будут загружены и отображены
    await waitFor(() => {
      expect(screen.getByText('Купить хлеб')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Купить масло')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Купить колбасу')).toBeInTheDocument();
    });

    // Проверяем, что fetch был вызван с правильным URL
    expect(global.fetch).toHaveBeenCalledWith(url, params);
  });
});
