import React from 'react';

export const TodoItem = ({isComplete, name}) => {
  return (
    <li>
      <input type="checkbox" defaultChecked={isComplete}/>{name}
    </li>
  )
}

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired
}
