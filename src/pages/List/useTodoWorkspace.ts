import { useReducer } from 'react';
import { todoService } from '../../services/todoService';
import { TodoAction, TodoActionKind, TodosState } from '../../types/todoTypes';

const todosReducer = (state: TodosState, action: TodoAction) => {
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
    case TodoActionKind.FETCH_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        todos: [action.payload, ...state.todos],
      };
    case TodoActionKind.FETCH_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case TodoActionKind.FETCH_COMPLETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        todos: state.todos.map((todo) => (todo.id === action.payload.id ? ({
          ...todo,
          isComplete: action.payload.isComplete,
        }) : todo)),
      };
    case TodoActionKind.FETCH_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        todos: state.todos.map((todo) => ((todo.id === action.payload.id) ? ({
          ...todo,
          description: action.payload.description,
        }) : todo)),
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
  const [state, dispatch] = useReducer(todosReducer, {
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

      dispatch({ type: TodoActionKind.FETCH_ADD_SUCCESS, payload: data.item });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const deleteTodo = async (id: number) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const data = await todoService.remove(id);

      dispatch({ type: TodoActionKind.FETCH_DELETE_SUCCESS, payload: data.item });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const changeCompleteTodo = async (id: number, isComplete: boolean) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const data = await todoService.complete(id, isComplete);

      dispatch({ type: TodoActionKind.FETCH_COMPLETE_SUCCESS, payload: data.item });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const editDescriptionTodo = async (id: number, description: string) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const data = await todoService.edit(id, description);

      dispatch({ type: TodoActionKind.FETCH_EDIT_SUCCESS, payload: data.item });
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
