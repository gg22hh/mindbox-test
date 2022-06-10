import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { deleteTodos } from "../../../../store/TodoSlice";
import "./TodosBottom.scss";

interface TodosBottomProps {
    todosLeft: number | undefined;
    todosStatus: string;
    setTodosStatus: (status: string) => void;
}

export const TodosBottom: FC<TodosBottomProps> = ({
    todosLeft,
    todosStatus,
    setTodosStatus,
}) => {
    const dispatch = useDispatch();
    const left =
        todosLeft === 1 ? `${todosLeft} item left` : `${todosLeft} items left`;
    return (
        <div className="todos__bottom">
            <div className="todos__left">{left}</div>
            <div className="todos__status">
                <button
                    className={
                        todosStatus === "all"
                            ? "todos__status-item active"
                            : "todos__status-item"
                    }
                    onClick={() => setTodosStatus("all")}
                >
                    All
                </button>
                <button
                    className={
                        todosStatus === "active"
                            ? "todos__status-item active"
                            : "todos__status-item"
                    }
                    onClick={() => setTodosStatus("active")}
                >
                    Active
                </button>
                <button
                    className={
                        todosStatus === "completed"
                            ? "todos__status-item active"
                            : "todos__status-item"
                    }
                    onClick={() => setTodosStatus("completed")}
                >
                    Completed
                </button>
            </div>
            <button
                className="todos__button"
                onClick={() => dispatch(deleteTodos())}
            >
                Delete todos
            </button>
        </div>
    );
};
