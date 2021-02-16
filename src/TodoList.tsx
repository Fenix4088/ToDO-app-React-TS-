import React, { useCallback } from "react";
import { TodoListItem } from "./TodoListItem";
import { AddItemForm } from "./AddItemFrom";
import { EditableSpan } from "./EditableSpan";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import s from "./Common.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateT } from "./state/store";
import { addTaskAC, TaskT } from "./state/tasks-reducer";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesT,
  removeTodolistAC,
  TodoListT,
} from "./state/todolists-reducer";

type TodoListPropsType = {
  id: string;
};

export const TodoList = React.memo((props: TodoListPropsType) => {
  const todoList = useSelector<AppRootStateT, TodoListT>(
    (state) => state.todoLists.filter((tl) => props.id === tl.id)[0]
  );
  const tasks = useSelector<AppRootStateT, Array<TaskT>>(
    (state) => state.tasks[props.id]
  );
  const dispatch = useDispatch();
  console.log("TodoList is called", todoList.title);

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

  const filteredTasks = filterTasksForTodoList(todoList.filter);

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(title, todoList.id));
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
    dispatch(removeTodolistAC(todoList.id));
  }, [dispatch, todoList.id]);
  const changeTodoListTitle = useCallback(
    (newTitle: string) => {
      dispatch(changeTodolistTitleAC(newTitle, todoList.id));
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
          title={todoList.title}
          changeTitle={changeTodoListTitle}
        />
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
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

      <ul>
        {filteredTasks.length
          ? filteredTasks.map((task) => (
              <TodoListItem key={task.id} id={props.id} task={task} />
            ))
          : showNoTasksMessage(todoList.filter)}
      </ul>
    </div>
  );
});
