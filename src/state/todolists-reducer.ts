import { v1 } from "uuid";
import {TodolistT} from "../api/todolists-api";

export type FilterValuesT = "all" | "active" | "completed";

export type TodolistDomainT = TodolistT & {
  filter: FilterValuesT
}

export type TodolistReducerStateT = Array<TodolistDomainT>;

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
  todolistId: string;
};
export type ChangeTodolistTitleAT = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
export type ChangeTodolistFilterAT = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesT;
};

export const todoListID1 = v1();
export const todoListID2 = v1();
const initialState: TodolistReducerStateT = [];

export const todolistsReducer = (
  state: TodolistReducerStateT = initialState,
  action: ActionsT
): TodolistReducerStateT => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.id);
    case "ADD-TODOLIST":
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: "all",
          addedDate: "",
          order: 1
        },
        ...state,
      ];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    default:
      return state;
  }
};

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
    todolistId: v1(),
  };
};
export const changeTodolistTitleAC = (
  title: string,
  id: string
): ChangeTodolistTitleAT => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    title,
    id,
  };
};
export const changeTodolistFilterAC = (
  filter: FilterValuesT,
  id: string
): ChangeTodolistFilterAT => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter,
  };
};
