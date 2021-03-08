import React, { useCallback } from "react";
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
import { addTodolistAC, TodolistDomainT } from "./state/todolists-reducer";

import { useDispatch, useSelector } from "react-redux";
import { AppRootStateT } from "./state/store";

function App() {
  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootStateT, Array<TodolistDomainT>>(
    (state) => state.todoLists
  );

  const addTodoList = useCallback(
    (todoListTitle: string): void => {
      dispatch(addTodolistAC(todoListTitle));
    },
    [dispatch]
  );

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
              <Grid item key={todoList.id}>
                <Paper elevation={5} style={{ padding: "20px 10px" }}>
                  <TodoList key={todoList.id} todoListId={todoList.id} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
