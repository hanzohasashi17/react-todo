import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export enum TodoStatus {
    Completed = 'COMPLETED',
    InProgress = 'IN_PROGRESS',
    Pending = 'PENDING'
}

export type TodoType = {
    id: number
    title: string
    description: string
    status: TodoStatus
}

type TodosState = {
    list: TodoType[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

export const postTodosTitleAsync = createAsyncThunk<void, [], { state: RootState }>(
    'todos/postTodosTitleAsync',
    async ([], { getState }) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const todosTitle = getState().todos.list.map(todo => todo.title)

        const response = await fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(todosTitle),
        });

        if (!response.ok) {
            throw new Error('Failed to post todos');
        }
    }
);

const initialState: TodosState = {
    list: [
        { id: 1, title: 'Покушать', description: 'Покушать вкусно', status: TodoStatus.Completed },
        { id: 2, title: 'Поработать вечером перед компуктером', description: 'Но нужно и отдыхать', status: TodoStatus.InProgress },
        { id: 3, title: 'Погулять', description: 'Надо завести собаку', status: TodoStatus.Pending },
        { id: 4, title: 'Поспать', description: 'Минимум 7 часов', status: TodoStatus.Pending },
    ],
    status: 'idle',
    error: null,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload,
                description: 'Добавить описание...',
                status: TodoStatus.Pending
            }
            if (newTodo.title.length && newTodo.title.length <= 30) {
                state.list.push(newTodo)
            }
        },
        addTodoDescription: (state, action: PayloadAction<{ id: number, description: string }>) => {
            const currentTodo = state.list.find(todo => todo.id === action.payload.id)
            if (currentTodo) {
                currentTodo.description = action.payload.description || 'Добавить описание...'
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(todo => todo.id !== action.payload)
        },
        toggleTodoStatus: (state, action: PayloadAction<{ id: number, status: TodoStatus }>) => {
            const toggledTodo = state.list.find(todo => todo.id === action.payload.id)
            if (toggledTodo) {
                toggledTodo.status = action.payload.status
            }
        }
    },
    extraReducers: builder => {
        builder
          .addCase(postTodosTitleAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(postTodosTitleAsync.fulfilled, (state) => {
            state.status = 'succeeded';
            state.error = null;
          })
          .addCase(postTodosTitleAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to post todos';
          });
      },
})

export const { addTodo, addTodoDescription, deleteTodo, toggleTodoStatus } = todoSlice.actions
export default todoSlice.reducer