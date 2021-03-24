import React from "react";
import {Container, Grid, Paper} from "@material-ui/core";
import {TodoList} from "../TodoLists/TodoList/TodoList";
import {useSelector} from "react-redux";
import {AppRootStateT} from "../../app/store";
import {TodolistDomainT} from "../TodoLists/todolists-reducer";

type TodolistsListT = {
    demo?: boolean
}

export const TodolistsList = ({demo}: TodolistsListT) => {
    const todoLists = useSelector<AppRootStateT, Array<TodolistDomainT>>(
        (state) => state.todoLists
    );

    return(
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
    )
}