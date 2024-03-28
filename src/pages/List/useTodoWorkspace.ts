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
        todos: action.payload.items,
        count: action.payload.count,
      };
    case TodoActionKind.FETCH_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        todos: [action.payload.item, ...state.todos],
        count: action.payload.count,
      };
    case TodoActionKind.FETCH_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        todos: state.todos.filter((todo) => todo.id !== action.payload.item.id),
        count: action.payload.count,
      };
    case TodoActionKind.FETCH_COMPLETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        todos: state.todos.map((todo) => (todo.id === action.payload.item.id ? ({
          ...todo,
          isComplete: action.payload.item.isComplete,
        }) : todo)),
        count: action.payload.count,
      };
    case TodoActionKind.FETCH_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        todos: state.todos.map((todo) => ((todo.id === action.payload.item.id) ? ({
          ...todo,
          description: action.payload.item.description,
        }) : todo)),
        count: action.payload.count,
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
    count: 0,
  });

  const getTodos = async (currentPage: number, itemsPerPage: number) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const data = await todoService.getList(currentPage, itemsPerPage);

      dispatch({
        type: TodoActionKind.FETCH_SUCCESS,
        payload: { items: data.items, count: data.count },
      });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const addTodo = async (description: string) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const data = await todoService.add(description);

      dispatch({
        type: TodoActionKind.FETCH_ADD_SUCCESS,
        payload: { item: data.item, count: data.count },
      });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const deleteTodo = async (id: number) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const data = await todoService.remove(id);

      dispatch({
        type: TodoActionKind.FETCH_DELETE_SUCCESS,
        payload: { item: data.item, count: data.count },
      });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const changeCompleteTodo = async (id: number, isComplete: boolean) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const data = await todoService.complete(id, isComplete);

      dispatch({
        type: TodoActionKind.FETCH_COMPLETE_SUCCESS,
        payload: { item: data.item, count: data.count },
      });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const editDescriptionTodo = async (id: number, description: string) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const data = await todoService.edit(id, description);

      dispatch({
        type: TodoActionKind.FETCH_EDIT_SUCCESS,
        payload: { item: data.item, count: data.count },
      });
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
