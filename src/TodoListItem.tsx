import React, { ChangeEvent } from "react";
import { TaskType } from "./App";
import { EditableSpan } from "./EditableSpan";

type TodoListItemType = {
  id: string;
  task: TaskType;
  removeTask: (taskId: string, id: string) => void;
  changeStatus: (taskId: string, isDone: boolean, id: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todoListID: string
  ) => void;
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

  const changeTitle = (newTitle: string): void => {
    props.changeTaskTitle(task.id, newTitle, props.id);
  };

  return (
    <li className={task.isDone ? "is-done" : ""}>
      <input
        onChange={onCheckboxChange}
        type="checkbox"
        checked={task.isDone}
      />
      <EditableSpan title={task.title} changeTitle={changeTitle} />
      <button onClick={removeTask}>X</button>
    </li>
  );
};
