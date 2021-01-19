import React, { ChangeEvent } from "react";
import { TaskType } from "./App";
import { EditableSpan } from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
      <Checkbox onChange={onCheckboxChange} checked={task.isDone} color={"primary"}/>
      <EditableSpan title={task.title} changeTitle={changeTitle} />
      <IconButton onClick={removeTask}>
        <Delete/>
      </IconButton>
    </li>
  );
};
