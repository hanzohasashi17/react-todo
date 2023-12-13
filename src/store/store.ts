import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice'
import filterSlice from "./filterSlice";

const store = configureStore({
    reducer: {
        todos: todoReducer,
        filter: filterSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch