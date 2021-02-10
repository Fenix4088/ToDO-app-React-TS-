import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { TodoListItem } from "./TodoListItem";
import { AddItemForm } from "./AddItemFrom";
import { EditableSpan } from "./EditableSpan";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import s from "./Common.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateT } from "./state/store";
import { addTaskAC, TaskStateT, TaskT } from "./state/tasks-reducer";
import {
  changeTodolistTitleAC,
  FilterValuesT,
  TodoListT,
} from "./state/todolists-reducer";

type TodoListPropsType = {
  id: string;
  title: string;
  filter: FilterValuesT;
  changeFilter: (filterVal: FilterValuesT, id: string) => void;
  removeTodoList: (todoListId: string) => void;
};

export function TodoList(props: TodoListPropsType) {
  const tasks = useSelector<AppRootStateT, Array<TaskT>>(
    (state) => state.tasks[props.id]
  );
  const dispatch = useDispatch();

  function filterTasksForTodoList(
    todoFilterValue: FilterValuesT
  ): Array<TaskT> {
    let tasksForTodoList = tasks;
    if (todoFilterValue === "active") {
      tasksForTodoList = tasks.filter((task) => !task.isDone);
    }
    if (todoFilterValue === "completed") {
      tasksForTodoList = tasks.filter((task) => task.isDone);
    }

    return tasksForTodoList;
  }

  const filteredTasks = filterTasksForTodoList(props.filter);

  const addTask = (title: string): void => {
    dispatch(addTaskAC(title, props.id));
  };
  const onAllClickHandler = () => {
    props.changeFilter("all", props.id);
  };
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id);
  };
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id);
  };
  const removeTodoList = (): void => {
    props.removeTodoList(props.id);
  };
  const changeTodoListTitle = (newTitle: string): void => {
    dispatch(changeTodolistTitleAC(newTitle, props.id));
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div className={s.btnGroup}>
        <Button
          variant={props.filter === "all" ? "outlined" : "contained"}
          color={"primary"}
          onClick={onAllClickHandler}
          size={"small"}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "outlined" : "contained"}
          color={"primary"}
          onClick={onActiveClickHandler}
          size={"small"}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "outlined" : "contained"}
          color={"primary"}
          onClick={onCompletedClickHandler}
          size={"small"}
        >
          Completed
        </Button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <TodoListItem key={task.id} id={props.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
