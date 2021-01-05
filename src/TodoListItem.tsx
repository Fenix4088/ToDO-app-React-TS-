import React, { ChangeEvent } from "react";
import { TaskType } from "./App";

type TodoListItemType = {
    id: string
  task: TaskType;
  removeTask: (taskId: string, id: string) => void;
  changeStatus: (taskId: string, isDone: boolean, id: string) => void;
};

export const TodoListItem: React.FC<TodoListItemType> = (props) => {
  const { task } = props;

  const removeTask = () => {
    props.removeTask(task.id, props.id);
  };
  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    props.changeStatus(task.id, checked, props.id);
  };

  return (
    <li className={task.isDone ? "is-done" : ""}>
      <input
        onChange={onCheckboxChange}
        type="checkbox"
        checked={task.isDone}
      />
      <span>{task.title}</span>
      <button onClick={removeTask}>X</button>
    </li>
  );
};