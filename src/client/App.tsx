import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';

import window from './types';
import { ALL, COMPLETED, INCOMPLETED } from './constants';

function App() {
  const emptyList: any[] = [];
  const [todoItems, setTodoItems] = useState(emptyList);
  const [status, setStatus] = useState(ALL);
  
  const fetchItemsForStatus = async (newStatus: string, e: any) => {
    e.preventDefault();
    const { data }: any = await axios.get(
      '/api/fetch_items',
      { params: { status: newStatus} }
    );

    setTodoItems(data);
    setStatus(newStatus);
  }

  useEffect(() => {
    const items = JSON.parse(window.todoItems);
    setTodoItems(items);
  }, []);

  const addItem = async (evt: any) => {
    if (evt.key !== 'Enter') return;
    
    const item = evt.target.value;
    const { data } = await axios.post('/api/save_item', { text: item });
    evt.target.value = '';
    const list = [...todoItems, data];
    setTodoItems(list);
  }

  return (
    <React.StrictMode>
      <div className='Rectangle'>
        <div>
          <img src="/images/group.png" className="Group"></img>
        </div>

        <span className="Todo-List Text-Style">
          Todo List
        </span>
        <br/>
        <span>
          <input onKeyUp={addItem} 
            className='Add-a-new-todo'
            name='new-todo'
            type='text'
            placeholder="Add a new todo">
          </input>
        </span>

        {todoItems.map((todoItem: any) => {
          return <TodoItem key={todoItem.id} {...todoItem} />
        })}
        
        <div>
          <span className="Show">
            Show:
          </span>

          <span className="All">
            { 
              status === ALL ? 
              'All' : <a href='#' onClick={(e) => fetchItemsForStatus(ALL, e)}>All</a> 
            }
          </span>

          <span className="Completed">
          { 
            status === COMPLETED ? 
            'Completed' : <a href='#' onClick={(e) => fetchItemsForStatus(COMPLETED, e)}>Completed</a> 
          }
          </span>
          
          <span className="Incompleted">
          { 
            status === INCOMPLETED ? 
            'Incompleted' : <a href='#' onClick={(e) => fetchItemsForStatus(INCOMPLETED, e)}>Incompleted</a> 
          }
          </span>
        </div>
      </div>
    </React.StrictMode>
  );
}

export default App;
