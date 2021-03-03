import React, { useEffect, useState } from "react";
import { todolistsAPI } from "../api/todolists-api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistsAPI.getTodolists().then((resp) => setState(resp.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistsAPI.createTodolist("Yehor todolist").then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistsAPI.deleteTodolist("993008cc-0b2f-4ff9-887e-877ec9e767c8").then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistsAPI.updateTodolist("993008cc-0b2f-4ff9-887e-877ec9e767c8", "Fuck you").then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "d0f69b77-67f3-4481-ad56-589d628f5436"
    todolistsAPI.getTasks(todolistId).then((resp) => setState(resp.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "d0f69b77-67f3-4481-ad56-589d628f5436"
    const taskId = "d0f69b77-67f3-4481-ad56-589d628f5436"
    todolistsAPI.deleteTask(todolistId, taskId).then((resp) => setState(resp.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
