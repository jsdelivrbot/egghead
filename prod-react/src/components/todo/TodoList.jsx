import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({todos, handleToggle}) => {
  return (
    <div className="Todo-List">
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id}
            handleToggle={handleToggle}
            {...todo} />
        ))}
      </ul>
    </div>
  )
}

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired
}
