import React, { useState } from "react";

function PrevApp() {
  // todos = 할 일 목록
  const [todos, setTodos] = useState([]);
  // todo = 할 일 하나
  const [todo, setTodo] = useState("");
  //todo에 입력된 값을 받아서 todos에 넣음
  const onChange = (e) => {
    // input에 입력값을 받으면 출력시킴(입력이 되게 함.)
    setTodo(e.target.value);
  };

  const onSubmit = (e) => {
    // 버튼이 클릭될 때마다 페이지 전체가 새로고침 되는 것을 막음.
    e.preventDefault();

    /*todo가 빈칸이면 버튼을 입력해도 아무것도 실행되지 않는다.*/

    if (todo === "") {
      alert("1글자 이상 입력해주세요.");
      return;
    }

    // todo로 받은 input값을 todos 배열에 넣어줘야 함.
    setTodos((currentArray) => [todo, ...currentArray]);
    // setTodos의 상태는 'const [todos, setTodos] = useState([]);', 빈 상태.
    // 이전 상태의 의미를 'currentArray'로 이름지음.
    // 초기값은 아무것도 입력되지 않았으니 빈 상태([]).
    // 이미 입력된 값이 A, C이며 B를 입력했다고하면
    // setTodos((A, C) => [B, [A, C]]); → 결과값 : [B, A, C]
    // setTodo((curr-) => [todo, ...currentArray]);

    //input에 입력 후 등록을 누르면 다시 빈칸으로 만들기.
    setTodo("");
  };

  return (
    <div>
      <h1>할 일</h1>
      <form onSubmit={onSubmit}>
        {/* onSubmit = 양식이 제출 됐을 때 onSubmit을 실행시킴 */}
        <input
          type="text"
          onChange={onChange}
          value={todo}
          placeholder="할 일을 적어주세요."
        />
        <button>등록</button>
        {/* button을 누르면 제출이 되며, 그 때에 onSubmit함수가 실행됨(form 태그 내에 있기 때문) */}
      </form>
      <button
        onClick={() => {
          console.log({ todos });
        }}
      >
        check
      </button>
      <hr />
      {/* todos UI 표시(입력된 할 일을 map함수를 이용하여 리스트로 표시하기) */}
      <ul>
        {/* 아래에서 사용한 (todo)는 위에서 정의한 todo와는 별개임. */}
        {todos.map((todo) => (
          <li>{todo}</li>
        ))}
        <li></li>
      </ul>
    </div>
  );
}

export default PrevApp;
