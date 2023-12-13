import { useState } from "react"
import { useAppDispatch } from "../../hooks"
import { addTodo } from "../../store/todoSlice"

export function AddTodoForm() {
    let [value, setValue] = useState('')
    const dispatch = useAppDispatch()

    const onSubmit = (e: any) => {
        e.preventDefault()
        dispatch(addTodo(value))
        setValue('')
    }

    return (
        <form onSubmit={onSubmit} className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Добавить задачу..."
                aria-describedby="button-addon2"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
                className="btn btn-todo"
                type="submit"
                id="button-addon2">Добавить
            </button>
        </form>
    )
}