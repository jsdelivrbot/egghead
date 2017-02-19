import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({todos, handleToggle, handleRemove}) => {
  return (
    <div className="Todo-List">
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id}
            handleToggle={handleToggle}
            handleRemove={handleRemove}
            {...todo} />
        ))}
      </ul>
    </div>
  )
}

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired
}
