import React, { useCallback, useEffect } from "react";
import "./App.css";
import { AddItemForm } from "../components/AddItemForm/AddItemFrom";
import {
  AppBar,
  Button,
  IconButton,
  Typography,
  Toolbar,
  Container,
  Grid,
 LinearProgress,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
  createTodoList,
  fetchTodoListsTC,
} from "../features/TodoLists/todolists-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateT } from "./store";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackBar";
import {StatusT} from "./app-reducer";
import {TodolistsList} from "../features/TodolistsList/TodolistLists";

type AppPropsT = {
  demo?: boolean;
}

function App({demo = false}: AppPropsT) {

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

        <TodolistsList demo={demo}/>

      </Container>
    </div>
  );
}

export default App;
