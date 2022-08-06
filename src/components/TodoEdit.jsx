import React, { useEffect, useState } from 'react';
import '../styles/TodoEdit.scss';

const TodoEdit = ({ selectedTodo, onUpdate }) => {
    //무언가 입력을 해야하기 때문에 useState에는 ""를 넣음.
    const [value, setValue] = useState("");
    const onChange = (e) => {
        //수정하기 input부분에 입력이 가능하도록 함.
        setValue(e.target.value);
    };
    
    const onSubmit = (e) => {
        //[수정하기]를 클릭하면 새로고침 되는 것을 막기.
        e.preventDefault();
        
        //[수정하기]를 눌렀을 때 몇 번을 바꿀지, 어떤걸 바꿀지가 있어야 함.
        onUpdate(selectedTodo.id, value);

        //Value값 초기화 시킴
        setValue("");
    };

    //수정하기를 클릭 했을 때, 클릭한 할 일이 text에 나오게 하기 위한 useEffect.
    //아래 input > value={value}를 {selectedTodo.text}로 바꿔줘도 되지만, 그러면 입력이 되지 않는다.
    //그렇기에 value={value}는 그대로 두고, 표시되는 항목만 바꿔야 함.
    //useEffect로 기본 value를 바꿔주는 작업 진행.
    useEffect(() => {
        // 2. value값을 selectedTodo.text로 바꾸겠다.
        setValue(selectedTodo.text);
        
    // 1. selectedTodo 값이 바뀐다면 ↑
    },[selectedTodo])



    return (
        <div className="background">
            <form onSubmit={onSubmit} className="todoedit__insert">
                <h2>수정하기</h2>
                <input 
                    onChange={onChange} 
                    value={value}
                    placeholder={"할 일을 입력하세요."}
                />
                <button type="submit">수정하기</button>
            </form>
            
        </div>
    );
};

export default TodoEdit;