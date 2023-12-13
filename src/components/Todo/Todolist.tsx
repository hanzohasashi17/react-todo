import { useAppDispatch, useAppSelector } from "../../hooks"
import { setFilter } from "../../store/filterSlice"
import { TodoStatus, TodoType } from "../../store/todoSlice"
import { Todo } from "./Todo"


export function TodoList() {
    const todos = useAppSelector(state => state.todos.list)
    const filter = useAppSelector(state => state.filter.filter)
    const dispatch = useAppDispatch()

    let filteredTodo: Array<TodoType> = []

    switch (filter) {
        case 'all':
            filteredTodo = todos
            break
        case TodoStatus.Pending:
            filteredTodo = todos.filter(todo => todo.status === TodoStatus.Pending)
            break
        case TodoStatus.InProgress:
            filteredTodo = todos.filter(todo => todo.status === TodoStatus.InProgress)
            break
        case TodoStatus.Completed:
            filteredTodo = todos.filter(todo => todo.status === TodoStatus.Completed)
            break
    }

    const setFilterValue = (newFilter: string) => {
        dispatch(setFilter(newFilter));
    };

    return (
        <div>
            <div className="btn-group dropend">
                <button type="button" className="btn btn-todo dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Сортировка задач
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => setFilterValue('all')}>Все</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setFilterValue(TodoStatus.Pending)}>В ожиданий</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setFilterValue(TodoStatus.InProgress)}>В работе</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setFilterValue(TodoStatus.Completed)}>Выполненные</a></li>
                </ul>
            </div>
            <ul className='list-group mt-4'>
                {
                    filteredTodo.length !== 0 ? filteredTodo.map(todo => (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            description={todo.description}
                            status={todo.status}
                        />
                    )) : <h5>Список задач пуст :(</h5>
                }
            </ul>
        </div>

    )
}