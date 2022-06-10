import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodos } from "../types/types";

type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

type TodosState = {
    todos: Todo[];
    loading: boolean;
};

const initialState: TodosState = {
    todos: [],
    loading: false,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (response.ok) {
        const json = await response.json();
        return json.slice(0, 3);
    } else {
        return new Error("Ошибка при получении todos");
    }
});

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        toggleItem(state, action: PayloadAction<ITodos>) {
            const updatedTodo = {
                ...action.payload,
                completed: !action.payload.completed,
            };
            state.todos = state.todos.map((todo) => {
                if (todo.id === updatedTodo.id) {
                    return updatedTodo;
                }
                return todo;
            });
        },
        deleteTodos(state) {
            const sure = window.confirm("Delete tasks ?");
            if (sure) {
                const updatedTodos = [...state.todos];
                state.todos = updatedTodos.filter(
                    (todo) => todo.completed === false
                );
            }
        },
        addNewTodo(state, action: PayloadAction<string>) {
            const id = Math.random();
            state.todos.push({
                userId: id,
                id: id,
                title: action.payload,
                completed: false,
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
            state.loading = false;
        });
    },
});

export const { toggleItem, deleteTodos, addNewTodo } = todoSlice.actions;

export default todoSlice.reducer;
