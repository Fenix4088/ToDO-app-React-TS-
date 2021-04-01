import React, {useCallback, useEffect} from "react";
import { Route } from "react-router";
import "./App.css";
import {
  AppBar,
  Button,
  IconButton,
  Typography,
  Toolbar,
  Container,
  LinearProgress,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
  fetchTodoListsTC,
} from "../features/TodoLists/todolists-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateT } from "./store";
import { CustomizedSnackbars } from "../components/ErrorSnackbar/ErrorSnackBar";
import {initializeAppWatcherSaga, StatusT} from "./app-reducer";
import { TodolistsList } from "../features/TodolistsList/TodolistLists";
import { Login } from "../features/Login/Login";
import {TasksPreloader} from "../components/TasksPreloader/TasksPreloader";
import {logoutTC} from "../features/Login/auth-reducer";

type AppPropsT = {
  demo?: boolean;
};

function App({ demo = false }: AppPropsT) {
  const appStatus = useSelector<AppRootStateT, StatusT>(
    (state) => state.app.status
  );
  const isInitialized = useSelector<AppRootStateT, boolean>(
    (state) => state.app.isInitialized
  );

  const isLoggedIn = useSelector<AppRootStateT, boolean>(
      (state) => state.login.isLoggedIn
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: "APP/INIT_APP_SAGA"})
  }, [])

  useEffect(() => {
    if (demo) return;
    dispatch(fetchTodoListsTC());
  }, [dispatch]);

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, []);

  if(!isInitialized) {
      return <div style={{position: "fixed", top: "30%", left: "42%", width: "100%"}}>
        <TasksPreloader size={"200"} type={"circle"}/>
      </div>;
  }




  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
        </Toolbar>
        {appStatus === "loading" && <LinearProgress color="secondary" />}

        <CustomizedSnackbars />
      </AppBar>

      <Container>
        <Route path={"/"} exact render={() => <TodolistsList demo={demo} />} />
        <Route path={"/login"} render={() => <Login />} />
      </Container>
    </div>
  );
}

export default App;
