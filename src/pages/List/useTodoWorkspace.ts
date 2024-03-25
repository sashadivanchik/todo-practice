import { useReducer } from 'react';
import { todoService } from '../../services/todoService';

type Todos = {
  id: number,
  description: string,
  isComplete: boolean
}

type TodosState = {
  isLoading: boolean,
  isError: boolean,
  todos: Todos[]
}

enum TodoActionKind {
  FETCH_INIT = 'FETCH_INIT',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAILURE = 'FETCH_FAILURE',
}

type TodoAction =
  | { type: TodoActionKind.FETCH_INIT }
  | { type: TodoActionKind.FETCH_SUCCESS, payload: Todos[] }
  | { type: TodoActionKind.FETCH_FAILURE };

const todosFetchReducer = (state: TodosState, action: TodoAction) => {
  switch (action.type) {
    case TodoActionKind.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case TodoActionKind.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        todos: action.payload,
      };
    case TodoActionKind.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export const useTodoWorkspace = () => {
  const [state, dispatch] = useReducer(todosFetchReducer, {
    isLoading: false,
    isError: false,
    todos: [],
  });

  const getTodos = async () => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const data = await todoService.getList();

      dispatch({ type: TodoActionKind.FETCH_SUCCESS, payload: data.items });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const addTodo = async (description: string) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const data = await todoService.add(description);

      dispatch({ type: TodoActionKind.FETCH_SUCCESS, payload: [data.item, ...state.todos] });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const deleteTodo = async (id: number) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const data = await todoService.remove(id);

      const filtered = state.todos.filter((todo) => todo.id !== data.item.id);

      dispatch({ type: TodoActionKind.FETCH_SUCCESS, payload: filtered });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const changeCompleteTodo = async (id: number, isComplete: boolean) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const data = await todoService.complete(id, isComplete);

      const updateData = state.todos.map((todo) => (todo.id === data.item.id ? ({
        ...todo,
        isComplete: data.item.isComplete,
      }) : todo));

      dispatch({ type: TodoActionKind.FETCH_SUCCESS, payload: updateData });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const editDescriptionTodo = async (id: number, description: string) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const data = await todoService.edit(id, description);

      const updateData = state.todos.map((todo) => ((todo.id === data.item.id) ? ({
        ...todo,
        description: data.item.description,
      }) : todo));

      dispatch({ type: TodoActionKind.FETCH_SUCCESS, payload: updateData });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  return {
    state,
    getTodos,
    addTodo,
    changeCompleteTodo,
    deleteTodo,
    editDescriptionTodo,
  };
};
