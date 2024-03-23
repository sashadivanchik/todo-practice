import { useReducer } from 'react';

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

const headers = {
  'Content-Type': 'application/json;charset=utf-8',
};

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

export const useTodoApi = () => {
  const [state, dispatch] = useReducer(todosFetchReducer, {
    isLoading: false,
    isError: false,
    todos: [],
  });

  const getTodos = async () => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const result = await fetch('http://localhost:7000/api/todos/getTodos', {
        method: 'GET',
        headers,
      });

      const data = await result.json();
      dispatch({ type: TodoActionKind.FETCH_SUCCESS, payload: data.items });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const addTodo = async (description: string) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

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

      dispatch({ type: TodoActionKind.FETCH_SUCCESS, payload: [data.item, ...state.todos] });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const deleteTodo = async (id: number) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

    try {
      const result = await fetch('http://localhost:7000/api/todos/deleteTodo', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({
          todoId: id,
        }),
      });

      const data = await result.json();

      const filtered = state.todos.filter((todo) => todo.id !== data.item.id);

      dispatch({ type: TodoActionKind.FETCH_SUCCESS, payload: filtered });
    } catch (e) {
      dispatch({ type: TodoActionKind.FETCH_FAILURE });
    }
  };

  const changeCompleteTodo = async (id: number, isComplete: boolean) => {
    dispatch({ type: TodoActionKind.FETCH_INIT });

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
      const result = await fetch('http://localhost:7000/api/todos/editDescription', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          todoId: id,
          description,
        }),
      });

      const data = await result.json();

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
