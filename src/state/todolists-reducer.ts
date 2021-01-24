import { FilterValuesType, TodoListType } from "../App";
import { v1 } from "uuid";

export type TodolistsReducerStateT = Array<TodoListType>;

type ActionsT =
  | RemoveTodolistAT
  | AddTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT;

export type RemoveTodolistAT = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistAT = {
  type: "ADD-TODOLIST";
  title: string;
};
export type ChangeTodolistTitleAT = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
export type ChangeTodolistFilterAT = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

export const todolistsReducer = (
  state: TodolistsReducerStateT,
  action: ActionsT
): TodolistsReducerStateT => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.id);
    case "ADD-TODOLIST":
      return [...state, { id: v1(), title: action.title, filter: "all" }];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    default:
      throw new Error("Action in userReducer is not valid!");
  }
};

// dsfldsf
export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
  return {
    type: "REMOVE-TODOLIST",
    id: todolistId,
  };
};
export const addTodolistAC = (title: string): AddTodolistAT => {
  return {
    type: "ADD-TODOLIST",
    title,
  };
};
export const changeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleAT => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    title,
    id,
  };
};
export const changeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodolistFilterAT => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter,
  };
};
