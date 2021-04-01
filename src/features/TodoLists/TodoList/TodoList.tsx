import React, { useCallback, useEffect, useMemo } from "react";
import { Task } from "./Task/Task";
import { AddItemForm } from "../../../components/AddItemForm/AddItemFrom";
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan";
import { AppBar, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import s from "../../../Common.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateT } from "../../../app/store";
import {createTask, TaskDomainT} from "../tasks-reducer";
import {
  changeTodolistFilterAC,
  deleteTodoList,
  TodolistDomainT,
  updateTodoList,
} from "../todolists-reducer";
import { TaskStatuses, TaskT } from "../../../api/todolists-api";
import { TasksPreloader } from "../../../components/TasksPreloader/TasksPreloader";
import { StatusT } from "../../../app/app-reducer";

type TodoListPropsType = {
  todoListId: string;
  isLoggedIn: boolean;
  demo?: boolean;
};

export const TodoList = React.memo(({ demo = false, isLoggedIn, ...props} : TodoListPropsType) => {

  const todoList = useSelector<AppRootStateT, TodolistDomainT>(
    (state) => state.todoLists.filter((tl) => props.todoListId === tl.id)[0]
  );
  const tasks = useSelector<AppRootStateT, Array<TaskDomainT>>(
    (state) => state.tasks[props.todoListId]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if(demo) return;

    dispatch({type: "TASKS/FETCH-TASKS", todoListId: todoList.id});

  }, [dispatch, todoList.id]);

  let tasksForTodoList = useMemo(() => {
    if (todoList.filter === "active") {
      return tasks.filter((task) => task.status === TaskStatuses.New);
    }
    if (todoList.filter === "completed") {
      return tasks.filter((task) => task.status === TaskStatuses.Completed);
    }

    return tasks;
  }, [todoList.filter, tasks]);

  const addTask = useCallback(
    (title: string) => {
      dispatch(createTask(todoList.id, title));
    },
    [dispatch, todoList.id]
  );

  const onAllClickHandler = useCallback(() => {
    dispatch(changeTodolistFilterAC("all", todoList.id));
  }, [dispatch, todoList.id]);

  const onActiveClickHandler = useCallback(() => {
    dispatch(changeTodolistFilterAC("active", todoList.id));
  }, [dispatch, todoList.id]);

  const onCompletedClickHandler = useCallback(() => {
    dispatch(changeTodolistFilterAC("completed", todoList.id));
  }, [dispatch, todoList.id]);

  const removeTodoList = useCallback((): void => {
    dispatch(deleteTodoList(todoList.id));
  }, [dispatch, todoList.id]);

  const changeTodoListTitle = useCallback(
    (newTitle: string) => {
      dispatch(updateTodoList(todoList.id, newTitle));
    },
    [dispatch, todoList.id]
  );

  const showNoTasksMessage = (filterName: string): JSX.Element => {
    filterName = filterName === "all" ? "any" : filterName;
    return (
      <span className={s.noTasksMessage}>You have no {filterName} tasks</span>
    );
  };

  return (
    <div>
      <h3>
        <EditableSpan
          taskTitle={todoList.title}
          changeTitle={changeTodoListTitle}
          disabled={todoList.entityStatus === "loading"}
        />
        <IconButton onClick={removeTodoList} disabled={todoList.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={todoList.entityStatus === "loading"}/>
      <div className={s.btnGroup}>
        <Button
          variant={todoList.filter === "all" ? "outlined" : "contained"}
          color={"primary"}
          onClick={onAllClickHandler}
          size={"small"}
        >
          All
        </Button>
        <Button
          variant={todoList.filter === "active" ? "outlined" : "contained"}
          color={"primary"}
          onClick={onActiveClickHandler}
          size={"small"}
        >
          Active
        </Button>
        <Button
          variant={todoList.filter === "completed" ? "outlined" : "contained"}
          color={"primary"}
          onClick={onCompletedClickHandler}
          size={"small"}
        >
          Completed
        </Button>
      </div>
      {todoList.entityStatus === "loading" ? (
        <TasksPreloader />
      ) : (
        <ul>
          {tasksForTodoList.length
            ? tasksForTodoList.map((task) => (
                <Task key={task.id} todoListId={props.todoListId} task={task} />
              ))
            : showNoTasksMessage(todoList.filter)}
        </ul>
      )}
    </div>
  );
});
