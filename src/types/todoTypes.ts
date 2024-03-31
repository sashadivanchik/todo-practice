export type Todo = {
  id: number,
  description: string,
  isComplete: boolean
};

export type TodosState = {
  isLoading: boolean,
  isError: boolean,
  todos: Todo[]
  count: number;
};

type TodoItem = {
  item: Todo;
  count: number;
};

export enum TodoActionKind {
  FETCH_INIT = 'FETCH_INIT',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_ADD_SUCCESS = 'FETCH_ADD_SUCCESS',
  FETCH_DELETE_SUCCESS = 'FETCH_DELETE_SUCCESS',
  FETCH_COMPLETE_SUCCESS = 'FETCH_COMPLETE_SUCCESS',
  FETCH_EDIT_SUCCESS = 'FETCH_EDIT_SUCCESS',
  FETCH_FAILURE = 'FETCH_FAILURE',
}

export type TodoAction =
  | { type: TodoActionKind.FETCH_INIT }
  | { type: TodoActionKind.FETCH_SUCCESS, payload: { items: Todo[], count: number} }
  | { type: TodoActionKind.FETCH_ADD_SUCCESS, payload: TodoItem }
  | { type: TodoActionKind.FETCH_DELETE_SUCCESS, payload: TodoItem }
  | { type: TodoActionKind.FETCH_COMPLETE_SUCCESS, payload: TodoItem }
  | { type: TodoActionKind.FETCH_EDIT_SUCCESS, payload: TodoItem }
  | { type: TodoActionKind.FETCH_FAILURE };
