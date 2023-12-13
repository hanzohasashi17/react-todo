import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { AddTodoForm } from './components/Todo/AddTodoForm'
import { TodoList } from './components/Todo/Todolist'
import { TodosCounter } from './components/Todo/TodosCounter'

function App() {
  return (
    <div className='container bg-white p-4 mt-5'>
      <h2>Приложение: Список задач</h2>
      <AddTodoForm />
      <TodoList />
      <TodosCounter />
    </div>
  )
}

export default App
