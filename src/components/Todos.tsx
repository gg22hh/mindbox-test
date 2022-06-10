import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleItem, fetchTodos } from "../store/TodoSlice";
import loadingGif from "../assets/loading.gif";
import { Todo } from "./Todo";
import { ITodos } from "../types/types";
import { TodosBottom } from "./TodosBottom";

export const Todos: FC = () => {
    const [todosStatus, setTodosStatus] = useState<string>("all");
    const [filtredTodos, setFiltredTodos] = useState<ITodos[]>([]);
    const [todosLeft, setTodosLeft] = useState<number>();
    const todos = useAppSelector((state) => state.todos.todos);
    const loading = useAppSelector((state) => state.todos.loading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);
    useEffect(() => {
        let todosTotal = 0;
        for (let i in todos) {
            if (!todos[i].completed) {
                todosTotal += 1;
            }
        }
        setTodosLeft(todosTotal);
    }, [todos]);
    useEffect(() => {
        if (todosStatus === "all") {
            setFiltredTodos(todos);
        } else if (todosStatus === "active") {
            setFiltredTodos(todos.filter((todo) => todo.completed === false));
        } else if (todosStatus === "completed") {
            setFiltredTodos(todos.filter((todo) => todo.completed === true));
        }
    }, [todosStatus, todos]);
    const todosList = filtredTodos?.map((todo) => {
        return (
            <Todo
                key={todo.id}
                title={todo.title}
                completed={todo.completed}
                changeStatus={() => dispatch(toggleItem(todo))}
            />
        );
    });
    return (
        <div className="todos">
            {loading ? (
                <img className="loading" src={loadingGif} alt="Loading..." />
            ) : (
                <>
                    <div className="todos__list">
                        {filtredTodos.length !== 0 ? (
                            todosList
                        ) : (
                            <div className="todos__empty">
                                There is no tasks
                            </div>
                        )}
                    </div>

                    <TodosBottom
                        todosLeft={todosLeft}
                        todosStatus={todosStatus}
                        setTodosStatus={setTodosStatus}
                    />
                </>
            )}
        </div>
    );
};
