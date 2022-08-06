import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdModeEditOutline, MdRemoveCircleOutline } from 'react-icons/md';
import cn from "classnames";
import '../styles/TodoListItem.scss';


const TodoListItem = ({ todo, onToggle, onRemove, onInsertToggle, setSelectedTodo }) => {
    const { id, text, checked } = todo;
    return (
        <li className="TodoListItem">
            {/* {todo.text}와 아래 내용은 같음(onClick제외). 다만 커스터마이징 차이. */}
            {/* 체크박스 클릭시 발생하는 내용 */}
            <div onClick={()=>{
                onToggle(id);
            }}
                className={cn("checkbox", { checked: checked })}>
                {/* 체크됐을 때 ? <된 박스> : (안됐을때?) <안된 박스> */}
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className="text">{text}</div>
            </div>
            <div className="edit" 
            onClick={() => {
                onInsertToggle();
                // 이전 상태(null)를 todo(입력값)으로 바꿈.
                // prev는 다른 단어여도 상관없음.
                setSelectedTodo((prev) => todo);
            }}>
                {/* 수정 아이콘 */}
                <MdModeEditOutline />
            </div>
            {/* 삭제 버튼을 클릭 했을 때, id 값을 반환*/}
            <div className="remove"
            onClick={() => {
                onRemove(id);
            }}>
                {/* 삭제 아이콘 */}
                <MdRemoveCircleOutline />
            </div>
        </li>
    );
};

export default TodoListItem;