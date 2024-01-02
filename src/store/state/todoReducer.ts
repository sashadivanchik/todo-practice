import { v4 as uuid4 } from 'uuid';
import {
  todoAction, TodoActionsType, TodoProps, TodoState,
} from './types';

export const initialState: TodoState = {
  todos: [],
};

const newTodo = (description: string): TodoProps => (
  { id: uuid4(), description, isComplete: false }
);

export const todoReducer = (state: TodoState, action: todoAction) => {
  const { type, payload } = action;

  switch (type) {
    case TodoActionsType.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, newTodo(payload.name)],
      };
    case TodoActionsType.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== payload.id),
      };
    case TodoActionsType.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((item) => (item.id === payload.id ? (
          { ...item, isComplete: !item.isComplete }
        ) : item)),
      };
    default:
      return state;
  }
};
