import { useAppSelector } from "../../hooks"
import { TodoStatus, TodoType } from "../../store/todoSlice"

export function TodosCounter() {
    const completedTodos: Array<TodoType> = useAppSelector((state) => (
        state.todos.list.filter(todo => todo.status === TodoStatus.Completed)
    ))

    return (
        <h4 className="mt-4">
            Число выполненных задач: {completedTodos.length}
        </h4>
    )
}