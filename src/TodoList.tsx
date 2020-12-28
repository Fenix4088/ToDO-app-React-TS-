import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import {TodoListItem} from "./TodoListItem";

type TodoListType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (filterVal: FilterValuesType) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

export function TodoList(props: TodoListType) {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        const clearedTitle = title.trim();
        if (clearedTitle) {
            props.addTask(clearedTitle);
        } else {
            setError("Title is required!");
        }

        setTitle('');

    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("");
        setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask();
    };
    const onAllClickHandler = () => {
        props.changeFilter('all')
    };
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    };
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    };

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    /*props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id);
                        };
                        const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
                            const {checked} = e.currentTarget;
                            props.changeStatus(task.id, checked);
                        }

                        return (
                            <li key={task.id}
                                className={task.isDone ? "is-done" : ""}
                            >
                                <input onChange={onCheckboxChange} type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={removeTask}>X
                                </button>
                            </li>
                        );
                    })*/

                    props.tasks.map(task => <TodoListItem key={task.id}
                        task={task}
                        removeTask={props.removeTask}
                        changeStatus={props.changeStatus}/>)
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}