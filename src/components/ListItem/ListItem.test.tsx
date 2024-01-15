import React from 'react';
import { render, screen } from '@testing-library/react';
import { ListItem } from './ListItem';

describe('Отображение елемента списка: ', () => {
  it('с описанием, не завершенное', async () => {
    render(
      <ListItem
        onRemove={() => {}}
        onToggle={() => {}}
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
});
