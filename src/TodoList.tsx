import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "./App";
import { TodoListItem } from "./TodoListItem";
import {AddItemForm} from "./AddItemFrom";
import {EditableSpan} from "./EditableSpan";

type TodoListType = {
  id: string
  title: string;
  filter: FilterValuesType;
  tasks: Array<TaskType>;
  addTask: (title: string, id: string) => void;
  removeTask: (taskId: string, id: string) => void;
  changeFilter: (filterVal: FilterValuesType, id: string) => void;
  changeStatus: (taskId: string, isDone: boolean, id: string) => void;
  removeTodoList: (todoListId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
  changeTodoListTitle: (newTitle: string, todoListID: string) => void
};

export function TodoList(props: TodoListType) {

  const addTask = (title: string):void => {
    props.addTask(title, props.id);

  }
  const onAllClickHandler = () => {
    props.changeFilter("all", props.id);
  };
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id);
  };
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id);
  };
  const removeTodoList = ():void => {
    props.removeTodoList(props.id);

  }

  const changeTodoListTitle = (newTitle: string):void => {
    props.changeTodoListTitle(newTitle, props.id)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
        <button onClick={removeTodoList}>X</button>
      </h3>
      <AddItemForm addItem={addTask}/>

      <ul>
        {
          props.tasks.map((task) => (
            <TodoListItem
              key={task.id}
              id={props.id}
              task={task}
              removeTask={props.removeTask}
              changeStatus={props.changeStatus}
              changeTaskTitle={props.changeTaskTitle}
            />
          ))
        }
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}