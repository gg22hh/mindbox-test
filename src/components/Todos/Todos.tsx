import React, { FC, useEffect } from "react";
import {
    useAppDispatch,
    useAppSelector,
    useTodosLeft,
    useTodosStatus,
} from "../../hooks";
import { toggleItem, fetchTodos } from "../../store/TodoSlice";
import loadingGif from "../../assets/loading.gif";
import { Todo } from "./components/Todo/Todo";
import { TodosBottom } from "./components/TodosBottom/TodosBottom";
import "./Todos.scss";

export const Todos: FC = () => {
    const loading = useAppSelector((state) => state.todos.loading);
    const { filtredTodos, todosStatus, setTodosStatus } = useTodosStatus();
    const todosLeft = useTodosLeft();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);
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
