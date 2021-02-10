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

  function changeFilter(filterVal: FilterValuesT, todoListID: string) {
    dispatch(changeTodolistFilterAC(filterVal, todoListID));
  }

  function removeTodoList(todoListId: string): void {
    dispatch(removeTodolistAC(todoListId));
  }

  function addTodoList(todoListTitle: string): void {
    dispatch(addTodolistAC(todoListTitle));
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
            return (
              <Grid item spacing={3} key={todoList.id}>
                <Paper elevation={5} style={{ padding: "20px 10px" }}>
                  <TodoList
                    key={todoList.id}
                    id={todoList.id}
                    filter={todoList.filter}
                    title={todoList.title}
                    changeFilter={changeFilter}
                    removeTodoList={removeTodoList}
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
