import React, { useReducer } from "react";
import { initialState, todoReducer } from "../state/todoReducer";
import { ListItem } from "../ListItem/ListItem";
import { Form } from "../Form/Form";
import { TodoActionsType } from "../state/types";
import { Container } from "../Container/Container";
import styles from "./List.module.css";

export const List: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleRemove = (id: string) => {
    dispatch({
      type: TodoActionsType.REMOVE_TODO,
      payload: { id }
    })
  };

  const handleToggle = (id: string) => {
    dispatch({
      type: TodoActionsType.TOGGLE_TODO,
      payload: { id }
    })
  };

  const handleAddTodo = (value: string) => {
    dispatch({type: TodoActionsType.ADD_TODO, payload: { name: value }})
  };

  return (
    <Container styleName={"asd"}>
      <>
        <h1>Список дел</h1>
        <div className={styles.formWrapper}>
          <Form
            placeholder={'введите сообщение'}
            onClick={handleAddTodo}
          />
        </div>

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
  )
};