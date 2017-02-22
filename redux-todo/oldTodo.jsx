import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider, connect } from 'react-redux';

/************************* BEGIN ACTIONS ***************************/
let nextTodoId = 0;
const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});

const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});
/************************* END ACTIONS *****************************/
/************************* BEGIN REDUCERS ***************************/
const todoReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };

    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, { completed: !state.completed} );

    default:
      return state;
  }
};

const todosReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todoReducer(undefined, action)
      ];

    case 'TOGGLE_TODO':
      return state.map(t => (
        todoReducer(t, action)
      ));

    default:
      return state;
  }
};

const visibilityFilterReducer = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;

    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer
});
/************************* END REDUCERS ***************************/
/************************* START COMPONENTS ***********************/

const getVisibleTodoList = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;

    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);

    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
  }
};

let TodoList = ({ todos, toggle }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        text={todo.text}
        completed={todo.completed}
        onClick={(id) => toggle(todo.id)} />
    ))}
  </ul>
);
const mapStateTodoListToProps = (state) => ({
  todos: getVisibleTodoList(state.todos, state.visibilityFilter) 
});
const mapDispatchTodoListToProps = (dispatch) => (
  { toggle: (id) => dispatch(toggleTodo(id)) }
);
TodoList = connect(
  mapStateTodoListToProps,
  mapDispatchTodoListToProps
)(TodoList);

const Todo = ({ text, completed, onClick }) => (
  <li onClick={onClick}
    style={{textDecoration: completed ? 'line-through' : 'none'}}>
    {text}
  </li>
);

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div className="todo-form">
      <input type="text"
        ref={node => {
          input = node;
        }} />
      <button onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
        }}>
        Add Todo
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo);

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}>
      {children}
    </a>
  );
};

const mapStateLinkToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});
const mapDispatchLinkToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
});
const FilterLink = connect(
  mapStateLinkToProps,
  mapDispatchLinkToProps
)(Link);

const FilterLinks = () => (
  <div>
    {'Show: '}
    <FilterLink filter="SHOW_ALL">All</FilterLink>
    {', '}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    {', '}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </div>
);

const TodoApp = () => (
  <div>
    <AddTodo />
    <TodoList />
    <FilterLinks />
  </div>
);

/*************************** END COMPONENTS *************************/
/************************* START PROVIDER ***************************/
const store = createStore(todoApp);
window.store = store;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <TodoApp />
    </Provider>,
    document.getElementById('root')
  );
});
