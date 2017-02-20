import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm, TodoList, Footer } from './components/todo';
import { addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos } from './lib/todoHelpers';
import { pipe, partial } from './lib/utils';
import { loadTodos, createTodo, saveTodo, deleteTodo } from './lib/todoService';

class App extends Component {
  state = {
    todos: [],
    currentTodo: ''
  };

  static contextTypes = {
    route: React.PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
  }

  handleRemove = (id) => {
    const removed = removeTodo(this.state.todos, id);
    this.setState({
      todos: removed
    });
    deleteTodo(id);
  };

  handleToggle = (id) => {
    // const getUpdatedTodos = pipe(
    //   findById,
    //   toggleTodo,
    //   partial(updateTodo, this.state.todos)
    // );
    const todo = findById(this.state.todos, id);
    const toggled = toggleTodo(todo);
    const updatedTodos = updateTodo(this.state.todos, toggled)

    // const updatedTodos = getUpdatedTodos(this.state.todos, id);
    this.setState({
      todos: updatedTodos
    });
    saveTodo(toggled)
      .then(() => this.showTempMessage('Todo Updated!'))
  };

  handleInputChange = (e) => {
    this.setState({currentTodo: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newId = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false}
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    });
    createTodo(newTodo)
      .then(() => this.showTempMessage('Todo Added!'))
  };

  showTempMessage = (msg) => {
    this.setState({ message: msg });
    setTimeout(() => this.setState({ message: ''} ), 2000);
  }

  handleError = (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    });
  };

  render() {
    const handleSubmit = this.state.currentTodo ? this.handleSubmit : this.handleError;
    const displayTodos = filterTodos(this.state.todos, this.context.route);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          <span className="error">{this.state.errorMessage}</span>
          <span className="success">{this.state.message}</span>
          <TodoForm handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={handleSubmit} />
          <TodoList
            todos={displayTodos}
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
