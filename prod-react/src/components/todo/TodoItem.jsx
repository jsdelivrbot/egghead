import React from 'react';
import { partial } from '../../lib/utils';

export const TodoItem = ({isComplete, name, id, handleToggle, handleRemove}) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={isComplete}
        onChange={partial(handleToggle, id)}/>{name}
      <span style={{float: `right`, paddingLeft: `10px`, color: `red`}}
        onClick={partial(handleRemove, id)}>X</span>
    </li>
  )
}

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired
}
