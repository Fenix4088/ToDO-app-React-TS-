import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemFrom";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
type TaskStateTyp = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todoListID1 = v1();
  const todoListID2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListID1, title: "What to learn?", filter: "all" },
    { id: todoListID2, title: "What to bue?", filter: "all" },
  ]);
  const [tasks, setTasks] = useState<TaskStateTyp>({
    [todoListID1]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "CSS", isDone: false },
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "React", isDone: true },
    ],
    [todoListID2]: [
      { id: v1(), title: "book", isDone: true },
      { id: v1(), title: "bread", isDone: false },
      { id: v1(), title: "milk", isDone: true },
    ],
  });

  function removeTask(taskId: string, todoListID: string) {
    const todoListTasks = tasks[todoListID];

    tasks[todoListID] = todoListTasks.filter((task) => task.id !== taskId);
    setTasks({ ...tasks });
  }

  function changeFilter(filterVal: FilterValuesType, todoListID: string) {
    const todoList = todoLists.find((todoList) => todoList.id === todoListID);
    if (todoList) {
      todoList.filter = filterVal;
      setTodoLists([...todoLists]);
    }
  }

  function addTask(title: string, todoListID: string) {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    };

    tasks[todoListID] = [newTask, ...tasks[todoListID]];
    setTasks({ ...tasks });
  }

  function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
    const todoListTasks = tasks[todoListID];
    const task = todoListTasks.find((task) => task.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  }

  function removeTodoList(todoListId: string): void {
    setTodoLists(todoLists.filter((todoList) => todoList.id !== todoListId));
    delete tasks[todoListId];
  }

  function filterTasksForTodoList(
    todoFilterValue: FilterValuesType,
    todoListId: string
  ) {
    let tasksForTodoList = tasks[todoListId];
    if (todoFilterValue === "active") {
      tasksForTodoList = tasks[todoListId].filter(
        (task) => task.isDone === false
      );
    }
    if (todoFilterValue === "completed") {
      tasksForTodoList = tasks[todoListId].filter(
        (task) => task.isDone === true
      );
    }

    return tasksForTodoList;
  }

  function addTodoList(todoListTitle: string): void {
    const todoListID = v1();

    const newTodoList: TodoListType = {
      id: todoListID,
      title: todoListTitle,
      filter: "all",
    };

    setTodoLists([...todoLists, newTodoList]);
    setTasks({ ...tasks, [todoListID]: [] });
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todoListID: string
  ) {
    const todoListTasks = tasks[todoListID];
    const task = todoListTasks.find((task) => task.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasks });
    }
  }

  function changeTodoListTitle(newTitle: string, todoListID: string): void {
    const todoList = todoLists.find((tl) => tl.id === todoListID);
    if (todoList) {
      todoList.title = newTitle;
      setTodoLists([...todoLists]);
    }
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />

      {todoLists.map((todoList) => {
        const tasksForTodoList = filterTasksForTodoList(
          todoList.filter,
          todoList.id
        );

        return (
          <TodoList
            key={todoList.id}
            id={todoList.id}
            filter={todoList.filter}
            title={todoList.title}
            tasks={tasksForTodoList}
            addTask={addTask}
            removeTask={removeTask}
            changeFilter={changeFilter}
            changeStatus={changeStatus}
            removeTodoList={removeTodoList}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
