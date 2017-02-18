import React from 'react';
import { partial } from '../../lib/utils';

export const TodoItem = ({isComplete, name, id, handleToggle}) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={isComplete}
        onChange={partial(handleToggle, id)}/>{name}
    </li>
  )
}

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired
}
