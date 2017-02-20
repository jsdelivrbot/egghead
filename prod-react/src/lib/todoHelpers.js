export const addTodo = (list, item) => [...list, item];

export const generateId = () => Math.floor(Math.random() * 100000);

export const findById = (list, id) => list.find(item => item.id === id);

export const toggleTodo = (todo) => (
  Object.assign({}, todo, { isComplete: !todo.isComplete })
);

export const updateTodo = (list, updated) => {
  const updatedIndex = list.findIndex(item => item.id === updated.id);
  return [
    ...list.slice(0, updatedIndex),
    updated,
    ...list.slice(updatedIndex + 1)
  ];
};

export const removeTodo = (list, id) => {
  const index = list.findIndex(item => item.id === id);
  return [...list.slice(0, index), ...list.slice(index + 1)];
};

export const filterTodos = (list, filter) => {
  if (filter === '/active') {
    return list.filter(item => !item.isComplete)
  } else if (filter === '/completed') {
    return list.filter(item => item.isComplete)
  } else {
    return list;
  }
};
