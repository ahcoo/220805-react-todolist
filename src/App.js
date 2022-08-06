import React, { useEffect, useRef, useState } from "react";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
import TodoEdit from "./components/TodoEdit";
import axios from "axios";

function App() {
  // todos = 할 일 목록. 빈 배열로 생성함.
  const [todos, setTodos] = useState([]);

  //insert창을 toggle한다는 소리. = 입력창을 껐다 켰다 하겠다는 의미.
  //여기서의 insert창은 수정하는 창이기 때문에 평소에는 꺼져있어야 함(false).
  const [insertToggle, setInsertToggle] = useState(false);

  //선택된(수정하기 버튼을 누른) 할 일로 배정하기 위한 선언. 첫 값은 null(아무것도 없음).
  const [selectedTodo, setSelectedTodo] = useState(null);

  // todo = 할 일 하나(input에서 입력한 값)
  // const [todo, setTodo] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //ID값 설정. 코딩에서의 숫자는 0부터 시작하기 때문에 초기값을 1로 지정함.
  const nextID = useRef(1);

  //component > TodoInsert.jsx에서 작성한 onSubmit>onInsert(value) 값을 받아오기 위한 선언.
  //
  const onInsert = (text) => {
    const todo = {
      id: nextID.current,
      text: text,
      checked: false,
    };
    //input으로 입력받은 todo(18번줄)를 todos의 빈 배열(6번줄)에 하나씩 추가(concat)함.
    setTodos((todos) => todos.concat(todo));

    //이 상태로 두면 ID값은 몇 번을 입력해도 1로 고정되기 때문에, 입력이 되면
    //자동적으로 숫자가 1씩 증가하도록 설정함.
    nextID.current++;
  };

  const onInsertToggle = () => {
    // 반전해줌. → 수정하기 창이 꺼져있을 땐 켜지고, 켜져있을 땐 꺼짐.
    setInsertToggle((prev) => !prev);
  };

  //변경이 일어나면 이 함수를 실행하겠다는 의미.
  //이 함수는 각 할 일의 수정하기 아이콘을 클릭하면, 그 내용을 id와 함께 배열에 넣겠다는 의미.
  //이렇게 작성하지 않고, 각 component에 지정한 onChangeSelectedTodo를 → setSelectedTodo로 바꾼 후
  //TodoListItem의 <div className="edit" setSelectedTodo((prev) => todo)로 해도 결과는 똑같다.
  // (주석제거&삭제)const onChangeSelectedTodo = (todo) => {
  //selectedTodo(null, 아무것도 없는 값에 todo를 잡아준다는 뜻.)
  //수정하기를 클릭하면, 클릭한 할 일을 selectedTodo라는 배열에 넣어주겠다.
  //   (주석제거&삭제)setSelectedTodo((selectedTodo) => todo);
  // (주석제거&삭제)};

  // 리스트의 어떤 체크박스를 눌렀을 때 '어떤'을 특정하기 위해 onToggle로 체크박스 id값을 받아옴.
  //1번이라면 id에 1, 2번이라면 id에 2.
  const onToggle = async (id) => {
    //axios url로 요청을 보낼거야. 단, id는 파라미터로
    //${id}번 url을 체크
    const data = await axios({
      url: `http://localhost:4000/todos/check/${id}`,
      method: "PATCH",
    });

    /*
    //Todos의 빈 배열을 바꿀 것 → 어떻게?
    setTodos((todos) =>
      //todos에게 map 함수를 걸 것. →  todos를 순회 할건데 그 중에
      todos.map((todo) =>
        //todo(할일 목록)의 id(todo.id)와 순회하는 id가 같다면,
        //다른 객체는 놔두고(...todo), checked만 바꿔줘(checked).
        //어떻게?(:) 지금 checked 상태의 반대로(!todo.checked)
        //나머지는 그대로 todo를 넣어줘(:todo)
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      
      )
    );
    ↑위 태그를 const data + setTodos(data.data)로 표현 가능.*/
    setTodos(data.data);
  };

  //삭제버튼을 눌렀을 때 일어나는 함수를 작성.
  const onRemove = (id) => {
    //Todos의 배열을 받아와서 바꿀 것. 어떻게?
    setTodos(
      //todos가 의 배열에 filter를 걸 것. (filter? → 걸러내는 것)
      //ex) const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']
      //const result = words.filter(word => word.length > 6);
      // result → ['exuberant', 'destruction', 'present']
      // → words의 배열 중 6글자 이상인 것들만 filter로 걸러냄.
      //todo 안에서 todo.id가 아닌 것만 남기게 됨((todo)=> todo.id!==id).
      // = id에 해당 되는 것만 사라짐.
      (todos) => todos.filter((todo) => todo.id !== id)
    );
  };

  //TodoEdit에서 id, text로 받아온 onUpdate 내용
  const onUpdate = (id, text) => {
    //todos배열에
    setTodos((todos) =>
      //map함수를 걸 것 → todos를 순회하면서
      //todos의 id와 todo의 id가 같다면, 다른 todo는 남기고(...todo),
      //text는 남겨(text:text → text로 생략 가능).
      //나머지는 그대로 남겨줘( : todo).
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    //[수정하기]를 클릭하면 수정하기 창이 꺼지도록 하기.
    onInsertToggle();
  };

  useEffect(() => {
    const getData = async () => {
      //getData를 하는데 API 통신 장애가 있을 수 있음.
      //try-catch로 로딩시, 에러발생시 대처
      try {
        const data = await axios({
          url: "http://localhost:4000/todos",
          method: "GET",
        });
        console.log(data.data);
        //todos와 똑같은 배열이 생기게 됨.
        setTodos(data.data);
        //데이터 저장이 끝난 다음에 로딩 표시
        setIsLoading(false);

        //에러가 생긴다면 catch(e) { setError(e) }를 실행
      } catch (e) {
        setError(e);
      }
    };
    //에러가 생기지 않는다면 getData(); 실행
    getData();
  }, []);

  //에러가 발생했을 때
  if (error) {
    //에러 : {error.message} 반환
    return <>에러: {error.message}</>;
  }
  //로딩 중일 때
  if (isLoading) {
    //Loading... 반환
    return <>Loading...</>;
  }

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />

      {/* 37~41줄의 Logic을 TodoList.jsx에서 구현하여 44줄의 TodoList로써 가져오도록 함. */}
      {/* <ul>
        {todos.map((todo, id) => (
          <li key={id}>{todo.text}</li>
        ))}
      </ul> */}
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onToggle={onToggle}
        onInsertToggle={onInsertToggle}
        setSelectedTodo={setSelectedTodo}
      />

      {/* 둘 다 True일 때만 True임.
      insertToggle이 참이면 TodoEdit(을 띄워주고,
      insertToggle이 거짓이면 TodoEdit을 안 띄워줌
      insertToggle은 아무 것도 들어있지 않기 때문에 기본적으로 True이며
      그로인해 TodoEdit 또한 참이므로 항상 발동됨. 
      => 위 선언에서 insertToggle은 false로 해두었기 때문에 평소에는 보이지 않음.
      거기에 더해, 클릭하면 TodoEdit의 onInsertToggle을 실행하도록 함.*/}
      {insertToggle && (
        <TodoEdit
          onInsertToggle={onInsertToggle}
          selectedTodo={selectedTodo}
          onUpdate={onUpdate}
        />
      )}
    </TodoTemplate>
  );
}

export default App;
