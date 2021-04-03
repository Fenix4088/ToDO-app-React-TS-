import React, { useCallback } from "react";
import { Redirect } from "react-router";
import { Grid, Paper } from "@material-ui/core";
import { TodoList } from "../TodoLists/TodoList/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateT } from "../../app/store";
import {
  createTodoList,
  TodolistDomainT,
} from "../TodoLists/todolists-reducer";
import { AddItemForm } from "../../components/AddItemForm/AddItemFrom";

type TodolistsListT = {
  demo?: boolean;
};

export const TodolistsList = ({ demo }: TodolistsListT) => {
  const todoLists = useSelector<AppRootStateT, Array<TodolistDomainT>>(
    (state) => state.todoLists
  );

  const isLoggedIn = useSelector<AppRootStateT, boolean>(
    (state) => state.login.isLoggedIn
  );

  const dispatch = useDispatch();

  const addTodoList = useCallback(
    (todoListTitle: string): void => {
      dispatch(createTodoList(todoListTitle));
    },
    [dispatch]
  );

    if(!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

  return (
    <>
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
                <TodoList
                  demo={demo}
                  isLoggedIn={isLoggedIn}
                  key={todoList.id}
                  todoListId={todoList.id}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
