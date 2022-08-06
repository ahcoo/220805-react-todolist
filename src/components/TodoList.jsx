import React from 'react';
import TodoListItem from './TodoListItem';

//todo로 입력받은 값(todo(input), index(id))을 todos(빈 배열)에 넣어주겠다.
//onToggle로 입력받은 값을 TodoListItem의 onToggle로 받겠다.
//onRemove로 입력받은 값을 TodoListItem의 onRemove로 받겠다.
//onInsertToggle로 입력 받은 값을 TodoListItem의 onInsertToggle로 받겠다.
//setSelectedTodo로 입력 받은 값을 TodoListItem의 setSelectedTodo로 받겠다.
const TodoList = ({ todos, onToggle, onRemove, onInsertToggle, setSelectedTodo }) => {
    return (
        <div className = "TodoList">
            {todos.map((todo, index) => (
                <TodoListItem
                 todo={todo}
                 key={index}
                 onToggle={onToggle} 
                 onRemove={onRemove} 
                 onInsertToggle={onInsertToggle} 
                 setSelectedTodo={setSelectedTodo}
                />
            ))}
            
        </div>
    );
};

export default TodoList;