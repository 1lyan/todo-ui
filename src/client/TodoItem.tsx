import React from 'react';
import axios from 'axios';

function TodoItem(todoItem: any) {
  const deleteItem = async () => {
    const itemElement = document.getElementById(todoItem.id);
    await axios.delete(`/api/delete_item/${todoItem.id}`);
    itemElement?.remove();
  }

  const completeItem = async (evt: any) => {
    console.log('value', evt.target, evt.target.checked);
    const newStatus = evt.target.checked ? 'completed' : 'incompleted';

    if (newStatus === 'completed')
      await axios.post('/api/complete_item', { id: todoItem.id });
    else if(newStatus === 'incompleted')
      await axios.post('/api/uncomplete_item', { id: todoItem.id });
  }

  const checked = todoItem.status == 'completed' ? true : false;

  return (
    <div id={todoItem.id}>
      <input 
        defaultChecked={checked}
        onChange={completeItem}
        type="checkbox"
        className="Todo-checkbox">
      </input>
      <span className="Make-a-todo-list">
        {todoItem.text}
      </span>

      <img onClick={deleteItem} 
        src="/images/path-copy.png" 
        srcSet="/images/path-copy@2x.png 2x,/images/path-copy@3x.png 3x"
        className="Path-Copy"
      />
    </div>
  )
}

export default TodoItem;