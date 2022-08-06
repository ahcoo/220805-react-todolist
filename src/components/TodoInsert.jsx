import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
//↓style>TodoInsert.scss에 디자인(CSS)을 넣고 불러옴.
import '../styles/TodoInsert.scss';



// 할 일 입력창(input, button) 관련 기능을 작성.


const TodoInsert = ({ onInsert }) => {
    //Value값 초기 설정. App.js → 클릭(button)이 일어날 때마다 값을 지정해줘야 함.
    const [value, setValue] = useState("");
    const onChange = (e) => {
        // input에 입력값을 받으면 그 값을 렌더링(보이게) 함. (=입력이 되게 함.)
        setValue(e.target.value);
    };
    const onSubmit = (e) => {
        // 버튼이 클릭될 때마다 페이지 전체가 새로고침 되는 것을 막음.
        e.preventDefault();
        // 할 일을 입력하고 버튼을 누르면 입력창을 초기화시킴.
        setValue("");
        //onInsert → value를 Todos 배열로 추가해주는 함수.
        onInsert(value);
        //그러나 여기에서 만들면 App.js에서 사용할 수 없음.
        //그래서 밖에서 받아오기 위해 11번줄에 ({ onInsert })를 넣음으로써
        //App.js에서 사용 가능하게 함.
        
    };

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input
                onChange={onChange}
                value={value}
                placeholder="할 일을 입력하세요."
            />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;