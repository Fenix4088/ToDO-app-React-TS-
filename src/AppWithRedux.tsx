import React from "react";
import "./App.css";
import { TodoList } from "./TodoList";
import { AddItemForm } from "./AddItemFrom";
import {
  AppBar,
  Button,
  IconButton,
  Typography,
  Toolbar,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesT,
  removeTodolistAC,
  TodoListT,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TaskStateT,
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateT } from "./state/store";

function AppWithRedux() {
  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootStateT, Array<TodoListT>>(
    (state) => state.todoLists
  );
  const tasks = useSelector<AppRootStateT, TaskStateT>((state) => state.tasks);

  function removeTask(taskId: string, todoListID: string) {
    dispatch(removeTaskAC(taskId, todoListID));
  }

  function changeFilter(filterVal: FilterValuesT, todoListID: string) {
    dispatch(changeTodolistFilterAC(filterVal, todoListID));
  }

  function addTask(title: string, todoListID: string) {
    dispatch(addTaskAC(title, todoListID));
  }

  function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
    dispatch(changeTaskStatusAC(taskId, isDone, todoListID));
  }

  function removeTodoList(todoListId: string): void {
    dispatch(removeTodolistAC(todoListId));
  }

  function filterTasksForTodoList(
    todoFilterValue: FilterValuesT,
    todoListId: string
  ) {
    let tasksForTodoList = tasks[todoListId];
    if (todoFilterValue === "active") {
      tasksForTodoList = tasks[todoListId].filter((task) => !task.isDone);
    }
    if (todoFilterValue === "completed") {
      tasksForTodoList = tasks[todoListId].filter((task) => task.isDone);
    }

    return tasksForTodoList;
  }

  function addTodoList(todoListTitle: string): void {
    dispatch(addTodolistAC(todoListTitle));
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todoListID: string
  ) {
    dispatch(changeTaskTitleAC(taskId, newTitle, todoListID));
  }

  function changeTodoListTitle(newTitle: string, todoListID: string): void {
    dispatch(changeTodolistTitleAC(newTitle, todoListID));
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid
          container
          style={{ padding: "10px" }}
          justify="center"
          alignItems="center"
        >
          <AddItemForm
            addItem={addTodoList}
            placeholder={"Enter Todo List name..."}
          />
        </Grid>

        <Grid container spacing={3}>
          {todoLists.map((todoList) => {
            const tasksForTodoList = filterTasksForTodoList(
              todoList.filter,
              todoList.id
            );

            return (
              <Grid item spacing={3}>
                <Paper elevation={5} style={{ padding: "20px 10px" }}>
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
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
