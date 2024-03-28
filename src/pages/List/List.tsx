import React, { useEffect, useState } from 'react';
import { ListItem } from '../../components/ListItem/ListItem';
import { Form } from '../../components/Form/Form';
import { Container } from '../../components/Container/Container';
import { Loading } from '../../components/Loading/Loading';
import { useTodoWorkspace } from './useTodoWorkspace';
import { Pagination } from '../../components/Pagination/Pagination';

const MAX_ITEMS_ON_PAGE = 10;

export const List: React.FC = () => {
  const {
    state,
    getTodos,
    addTodo,
    changeCompleteTodo,
    deleteTodo,
    editDescriptionTodo,
  } = useTodoWorkspace();

  const [page, setPage] = useState(1);

  useEffect(() => {
    getTodos(page, MAX_ITEMS_ON_PAGE);
  }, [page]);

  const handleRemove = (id: number) => {
    deleteTodo(id);

    if (page > 1 && state.todos.length % MAX_ITEMS_ON_PAGE === 1) {
      setPage(page - 1);
    }
  };

  const handleToggle = (id: number, isComplete: boolean) => {
    changeCompleteTodo(id, isComplete);
  };

  const handleAddTodo = (value: string) => {
    addTodo(value);
  };

  const handleEditTodo = (id: number, edited: string) => {
    editDescriptionTodo(id, edited);
  };

  return (
    <Container>
      <>
        <h1>Список дел</h1>
        <Form
          placeholder="что нужно сделать"
          onClick={handleAddTodo}
        />
        { state.isError && <div>Ошибка получения данных</div>}

        { state.count > MAX_ITEMS_ON_PAGE ? (
          <Pagination
            total={state.count}
            itemsPerPage={MAX_ITEMS_ON_PAGE}
            currentPage={page}
            onPageChange={setPage}
          />
        ) : null }

        { state.isLoading ? <Loading /> : state.todos && state.todos.map((todo) => (
          <ListItem
            key={todo.id}
            id={todo.id}
            description={todo.description}
            isComplete={todo.isComplete}
            onRemove={handleRemove}
            onToggle={handleToggle}
            onEdit={handleEditTodo}
          />
        )) }

        { state.count > MAX_ITEMS_ON_PAGE ? (
          <Pagination
            total={state.count}
            itemsPerPage={MAX_ITEMS_ON_PAGE}
            currentPage={page}
            onPageChange={setPage}
          />
        ) : null }
      </>
    </Container>
  );
};
