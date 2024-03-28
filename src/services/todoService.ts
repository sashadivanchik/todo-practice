const headers = {
  'Content-Type': 'application/json;charset=utf-8',
};

const getList = async (currentPage: number, itemsPerPage: number) => {
  const result = await fetch(
    `http://localhost:7000/api/todos/getTodos?page=${currentPage}&limitItems=${itemsPerPage}`,
    {
      method: 'GET',
      headers,
    },
  );

  return result.json();
};

const add = async (description: string) => {
  const result = await fetch('http://localhost:7000/api/todos/addTodo', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      description,
      isComplete: false,
    }),
  });

  return result.json();
};

const remove = async (id: number) => {
  const result = await fetch('http://localhost:7000/api/todos/deleteTodo', {
    method: 'DELETE',
    headers,
    body: JSON.stringify({
      todoId: id,
    }),
  });

  return result.json();
};

const complete = async (id: number, isComplete: boolean) => {
  const result = await fetch('http://localhost:7000/api/todos/editComplete', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      todoId: id,
      isComplete: !isComplete,
    }),
  });

  return result.json();
};

const edit = async (id: number, description: string) => {
  const result = await fetch('http://localhost:7000/api/todos/editDescription', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      todoId: id,
      description,
    }),
  });

  return result.json();
};

export const todoService = {
  getList,
  add,
  remove,
  complete,
  edit,
};
