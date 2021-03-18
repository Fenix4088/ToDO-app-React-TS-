import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TodoList } from "../features/TodoLists/TodoList/TodoList";
import { AddItemForm } from "../components/AddItemForm/AddItemFrom";
import {
  AppBar,
  Button,
  IconButton,
  Typography,
  Toolbar,
  Container,
  Grid,
  Paper, LinearProgress,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
  createTodoList,
  fetchTodoListsTC,
  TodolistDomainT,
} from "../features/TodoLists/todolists-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateT } from "./store";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackBar";
import {StatusT} from "./app-reducer";

type AppPropsT = {
  demo?: boolean;
}

function App({demo = false, ...props}: AppPropsT) {
  const todoLists = useSelector<AppRootStateT, Array<TodolistDomainT>>(
    (state) => state.todoLists
  );
  const appStatus = useSelector<AppRootStateT, StatusT>(state => state.app.status)
  const dispatch = useDispatch();

  useEffect(() => {
    if(demo) return;
    dispatch(fetchTodoListsTC());
  }, [dispatch]);

  const addTodoList = useCallback(
    (todoListTitle: string): void => {
      dispatch(createTodoList(todoListTitle));
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
        {appStatus === "loading" && <LinearProgress color="secondary"/>}

        <CustomizedSnackbars/>
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
                  <TodoList demo={demo} key={todoList.id} todoListId={todoList.id} />
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
