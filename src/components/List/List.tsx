import React, { useEffect, useState } from 'react';
import { ListItem } from '../ListItem/ListItem';
import { Form } from '../Form/Form';
import { Container } from '../Container/Container';
import { Loading } from '../Loading/Loading';

type TodosState = {
   id: number,
  description: string,
  isComplete: boolean
}

const headers = {
  'Content-Type': 'application/json;charset=utf-8',
};

export const List: React.FC = () => {
  const [todos, setTodos] = useState<TodosState[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const dataFetch = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await fetch('http://localhost:7000/api/todos/getTodos', {
          method: 'GET',
          headers,
        });

        const data = await result.json();
        setTodos(data.items);
      } catch (e) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    dataFetch();
  }, []);

  const fetchAddTodo = async (description: string) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetch('http://localhost:7000/api/todos/addTodo', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          description,
          isComplete: false,
        }),
      });

      const data = await result.json();

      setTodos([data.item, ...todos]);
    } catch (e) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  const removeTodoById = async (id: number) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetch('http://localhost:7000/api/todos/deleteTodo', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({
          todoId: id,
        }),
      });

      const data = await result.json();

      const filtered = todos.filter((todo) => todo.id !== data.item.id);

      setTodos(filtered);
    } catch (e) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  const fetchCompleteTodo = async (id: number, isComplete: boolean) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetch('http://localhost:7000/api/todos/editComplete', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          todoId: id,
          isComplete: !isComplete,
        }),
      });

      const data = await result.json();

      const updateData = todos.map((todo) => {
        if (todo.id === data.item.id) {
          return {
            ...todo,
            isComplete: data.item.isComplete,
          };
        }
        return todo;
      });

      setTodos(updateData);
    } catch (e) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  const fetchEditDescriptionTodo = async (id: number, description: string) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetch('http://localhost:7000/api/todos/editDescription', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          todoId: id,
          description,
        }),
      });

      const data = await result.json();

      const updateData = todos.map((todo) => {
        if (todo.id === data.item.id) {
          return {
            ...todo,
            description: data.item.description,
          };
        }
        return todo;
      });
      setTodos(updateData);
    } catch (e) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  const handleRemove = (id: number) => {
    removeTodoById(id);
  };

  const handleToggle = (id: number, isComplete: boolean) => {
    fetchCompleteTodo(id, isComplete);
  };

  const handleAddTodo = (value: string) => {
    fetchAddTodo(value);
  };

  const handleEditTodo = (id: number, edited: string) => {
    fetchEditDescriptionTodo(id, edited);
  };

  return (
    <Container>
      <>
        <h1>Список дел</h1>
        <Form
          placeholder="что нужно сделать"
          onClick={handleAddTodo}
        />
        { isError && <div>Ошибка получения данных</div>}

        { isLoading ? <Loading /> : todos && todos.map((todo) => (
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
