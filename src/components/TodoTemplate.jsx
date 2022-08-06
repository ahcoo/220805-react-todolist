import '../styles/TodoTemplate.scss'


//전체적 UI 관련 연동

function TodoTemplate({ children }) {
    return (
        <div className="TodoTemplate">
            <div className="app-title">Todo List</div>
            <div className="content">{children}</div>
        </div>
    );
}

export default TodoTemplate;