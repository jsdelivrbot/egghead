import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm, TodoList } from './components/todo';
import { addTodo, generateId } from './lib/todoHelpers';

class App extends Component {
  state = {
    todos: [
      {id: 1, name: 'Learn JSX', isComplete: true},
      {id: 2, name: 'Build an Awesome App', isComplete: false},
      {id: 3, name: 'Ship It!', isComplete: false}
    ],
    currentTodo: ''
  }

  handleInputChange = (e) => {
    this.setState({currentTodo: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newId = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false}
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
  }

  handleError = (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    });
  }

  render() {
    let handleSubmit = this.state.currentTodo ? this.handleSubmit : this.handleError;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          <span className="error">{this.state.errorMessage}</span>
          <TodoForm handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={handleSubmit} />
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
