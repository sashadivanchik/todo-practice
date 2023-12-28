import React, { useReducer } from "react";
import { initialState, todoReducer } from "../state/todoReducer";
import { ListItem } from "../ListItem/ListItem";
import { Input } from "../Input/Input";
import { TodoActionsType } from "../state/types";

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
    <div>
      <div>Todo</div>
      <Input
        placeholder={'введите сообщение'}
        onClick={handleAddTodo}
      />
      {state.todos.length ? state.todos.map((todo) => (
        <ListItem
          key={todo.id}
          id={todo.id}
          todoName={todo.todoName}
          isComplete={todo.isComplete}
          onRemove={handleRemove}
          onToggle={handleToggle}
        />
      )) : <div>Список пуст</div>}
    </div>
  )
};