import { addTodo, findById, toggleTodo, updateTodo, removeTodo, filterTodos } from './todoHelpers';

test('addTodo should add the passed todo to the list', () => {
  // arrange - starting data structure, what we're doing, and expected result
  const startTodos = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false }
  ];
  const newTodo = { id: 3, name: 'three', isComplete: false };
  const expected = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false }
  ];

  // act - call the code to test
  const result = addTodo(startTodos, newTodo);

  // assert - check results
  expect(result).toEqual(expected);
});

test('addTodo should not mutate the exisitng todo array', () => {
  const startTodos = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false }
  ];
  const newTodo = { id: 3, name: 'three', isComplete: false };

  const result = addTodo(startTodos, newTodo);

  expect(result).not.toBe(startTodos);
});

test('findById should return the expected item from an array', () => {
  const todos = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false }
  ];

  const foundTodo = findById(todos, 2);
  const expected = { id: 2, name: 'two', isComplete: false };

  expect(foundTodo).toEqual(expected);
});

test('toggleTodo should toggle the isComplete prop of a todo', () => {
  const startTodo = { id: 1, name: 'one', isComplete: false };
  const expected = { id: 1, name: 'one', isComplete: true };
  const result = toggleTodo(startTodo);

  expect(result).toEqual(expected);
});

test('toggleTodo should not mutate the existing todo', () => {
  const startTodo = { id: 1, name: 'one', isComplete: false };
  const result = toggleTodo(startTodo);

  expect(result).not.toBe(startTodo);
});

test('updateTodo should update an item by id', () => {
  const startTodos = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false }
  ];
  const updatedTodo = { id: 2, name: 'two updated', isComplete: false };
  const result = updateTodo(startTodos, updatedTodo);

  const expected = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two updated', isComplete: false },
    { id: 3, name: 'three', isComplete: false }
  ];

  expect(result).toEqual(expected);
})

test('updateTodo should not mutate the original array', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]
  const updatedTodo = {id:2, name: 'two', isComplete: true}

  const result = updateTodo(startTodos, updatedTodo)

  expect(result).not.toBe(startTodos)
})

test('removeTodo should remove an item by id', () => {
  const startTodos = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false }
  ];

  const expected = [
    { id: 1, name: 'one', isComplete: false },
    { id: 3, name: 'three', isComplete: false }
  ];

  const result = removeTodo(startTodos, 2);

  expect(result).toEqual(expected);
});

test('removeTodo should not mutate the original array', () => {
  const startTodos = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false }
  ];

  const result = removeTodo(startTodos, 2);

  expect(result).not.toBe(startTodos);
});

test('filterTodos should return all todos for the root route', () => {
  const allTodos = [
    { id: 1, name: 'one', isComplete: true },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false },
    { id: 4, name: 'four', isComplete: true}
  ];

  const result = filterTodos(allTodos, 'all');

  expect(result).toEqual(allTodos);
})

test ('filterTodos should return active todos for the active route', () => {
  const allTodos = [
    { id: 1, name: 'one', isComplete: true },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false },
    { id: 4, name: 'four', isComplete: true}
  ];

  const expected = [
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false },
  ];

  const result = filterTodos(allTodos, '/active');

  expect(result).toEqual(expected);
})

test ('filterTodos should return completed todos for the completed route', () => {
  const allTodos = [
    { id: 1, name: 'one', isComplete: true },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false },
    { id: 4, name: 'four', isComplete: true}
  ];

  const expected = [
    { id: 1, name: 'one', isComplete: true },
    { id: 4, name: 'four', isComplete: true}
  ];

  const result = filterTodos(allTodos, '/completed');

  expect(result).toEqual(expected);
})
