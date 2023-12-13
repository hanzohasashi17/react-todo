import { useAppDispatch } from '../../hooks'
import deleteIcon from '../../assets/trash.svg'
import './Todo.css'
import { TodoStatus, TodoType, addTodoDescription } from '../../store/todoSlice'
import { toggleTodoStatus } from '../../store/todoSlice'
import { deleteTodo } from '../../store/todoSlice'
import { useState } from 'react'

export function Todo({ id, title, description, status }: TodoType) {
    const [descriptionEditMode, setDescriptionEditMode] = useState(false)
    const [value, setValue] = useState(description)

    const dispatch = useAppDispatch()

    let statusNotice = ''
    let todoStyle = 'list-group-item d-flex justify-content-between align-items-center '

    if (status === TodoStatus.Pending) {
        statusNotice = 'Ожидание'
        todoStyle += 'todo-pending'
    } else if (status === TodoStatus.InProgress) {
        statusNotice = 'В работе'
        todoStyle += 'todo-in-progress'
    } else if (status === TodoStatus.Completed) {
        statusNotice = 'Выполнено'
        todoStyle += 'todo-completed'
    }

    return (
        <li className={todoStyle}>
            <div>
                <h5>{title}</h5>
                {
                    descriptionEditMode
                        ? <input
                            autoFocus
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={() => {
                                dispatch(addTodoDescription({id, description: value}))
                                setDescriptionEditMode(false)
                            }}
                        />
                        : <p onClick={() => setDescriptionEditMode(true)}>{description}</p>
                }
                <span
                    className='badge rounded-pill'
                >
                    {statusNotice}
                </span>
            </div>
            <div className='btn-group' role='group'>
                <button
                    className='btn btn-todo btn-sm'
                    data-bs-toggle="tooltip"
                    data-bs-placement="top" 
                    title="Задать статус: 'В ожиданий'"
                    onClick={() => dispatch(toggleTodoStatus({ id, status: TodoStatus.Pending }))}
                >
                    Ожидание
                </button>
                <button
                    className='btn btn-todo btn-sm'
                    data-bs-toggle="tooltip"
                    data-bs-placement="right" 
                    title="Задать статус: 'В работе'"
                    onClick={() => dispatch(toggleTodoStatus({ id, status: TodoStatus.InProgress }))}
                >
                    В работе
                </button>
                <button
                    className='btn btn-todo btn-sm'
                    data-bs-toggle="tooltip"
                    data-bs-placement="right" 
                    title="Задать статус: 'Выполнено'"
                    onClick={() => dispatch(toggleTodoStatus({ id, status: TodoStatus.Completed }))}
                >
                    Выполнено
                </button>
                <button
                    className='btn btn-todo btn-delete btn-sm'
                    onClick={() => dispatch(deleteTodo(id))}
                >
                    <img src={deleteIcon} alt="remove todo" />
                </button>
            </div>
        </li>
    )
}
