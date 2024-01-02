import React, { useReducer } from "react";

import { ListItem } from "../ListItem/ListItem";
import { Form } from "../Form/Form";
import { Container } from "../Container/Container";
import { initialState, todoReducer } from "../../store/state/todoReducer";
import { TodoActionsType } from "../../store/state/types";

export const List: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleRemove = (id: string) => {
    dispatch({
      type: TodoActionsType.REMOVE_TODO,
      payload: { id }
    });
  };

  const handleToggle = (id: string) => {
    dispatch({
      type: TodoActionsType.TOGGLE_TODO,
      payload: { id }
    });
  };

  const handleAddTodo = (value: string) => {
    dispatch({type: TodoActionsType.ADD_TODO, payload: { name: value }});
  };

  return (
    <Container>
      <>
        <h1>Список дел</h1>
        <Form
          placeholder={'введите сообщение'}
          onClick={handleAddTodo}
        />
        {state.todos.length ? state.todos.map((todo) => (
          <ListItem
            key={todo.id}
            id={todo.id}
            description={todo.description}
            isComplete={todo.isComplete}
            onRemove={handleRemove}
            onToggle={handleToggle}
          />
        )) : <div>Список пуст</div>}
      </>
    </Container>
  );
};
