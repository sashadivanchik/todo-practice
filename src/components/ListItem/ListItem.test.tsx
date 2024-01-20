import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ListItem } from './ListItem';

describe('Отображение елемента списка: ', () => {
  it('с описанием, не завершенное', async () => {
    render(
      <ListItem
        onRemove={() => {}}
        onToggle={() => {}}
        onEdit={() => {}}
        id="1"
        description="Сходить в магазин"
        isComplete={false}
      />,
    );

    const description = await screen.findByText('Сходить в магазин');
    expect(description).toBeInTheDocument();

    const deleteButtonText = await screen.findByText('Удалить');
    expect(deleteButtonText).toBeInTheDocument();
  });

  it('с описанием, завершенное', async () => {
    render(
      <ListItem
        onRemove={() => {}}
        onToggle={() => {}}
        onEdit={() => {}}
        id="1"
        description="Сходить в магазин"
        isComplete
      />,
    );

    const description = await screen.findByText('Сходить в магазин');
    expect(description).toBeInTheDocument();

    const deleteButtonText = await screen.findByText('В работу');
    expect(deleteButtonText).toBeInTheDocument();
  });

  it('переключение на завершение задачи', async () => {
    let isToggle = false;

    const handleToggle = () => {
      isToggle = true;
    };

    const { getByText, findByText, rerender } = render(
      <ListItem
        onRemove={() => {}}
        onEdit={() => {}}
        onToggle={handleToggle}
        id="1"
        description="Сходить в магазин"
        isComplete={isToggle}
      />,
    );

    const button = getByText('Завершить');

    fireEvent.click(button);

    rerender(
      <ListItem
        onRemove={() => {}}
        onEdit={() => {}}
        onToggle={handleToggle}
        id="1"
        description="Сходить в магазин"
        isComplete={isToggle}
      />,
    );

    const toggleButtonText = await findByText('В работу');
    expect(toggleButtonText).toBeInTheDocument();
  });
});
