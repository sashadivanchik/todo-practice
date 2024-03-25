import React, { useEffect } from 'react';
import { ListItem } from '../../components/ListItem/ListItem';
import { Form } from '../../components/Form/Form';
import { Container } from '../../components/Container/Container';
import { Loading } from '../../components/Loading/Loading';
import { useTodoWorkspace } from './useTodoWorkspace';

export const List: React.FC = () => {
  const {
    state,
    getTodos,
    addTodo,
    changeCompleteTodo,
    deleteTodo,
    editDescriptionTodo,
  } = useTodoWorkspace();

  useEffect(() => {
    getTodos();
  }, []);

  const handleRemove = (id: number) => {
    deleteTodo(id);
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
      </>
    </Container>
  );
};
