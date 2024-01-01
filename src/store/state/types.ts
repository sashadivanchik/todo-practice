export type TodoProps = {
  id: string;
  description: string;
  isComplete: boolean;
}

export type TodoState = {
  todos: TodoProps[]
}

export enum TodoActionsType {
  ADD_TODO = "ADD_TODO",
  REMOVE_TODO = "REMOVE_TODO",
  TOGGLE_TODO = "TOGGLE_TODO"
}

type AddTodoAction = {
  type: TodoActionsType.ADD_TODO;
  payload: { name: string }
}

type ModifyTodo = {
  type: TodoActionsType.TOGGLE_TODO | TodoActionsType.REMOVE_TODO;
  payload: { id: string }
}

export type todoAction = AddTodoAction | ModifyTodo;
