import { FilterValuesType, TodoListType } from "../App";
import { v1 } from "uuid";

export type TodolistReducerStateT = Array<TodoListType>;

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
  filter: FilterValuesType;
};

export const todoListID1 = v1();
export const todoListID2 = v1();
const initialState: TodolistReducerStateT = [
  { id: todoListID1, title: "What to learn?", filter: "all" },
  { id: todoListID2, title: "What to bue?", filter: "all" },
];

export type FilterValuesT = "all" | "active" | "completed";
export type TodoListT = {
  id: string;
  title: string;
  filter: FilterValuesT;
};

export const todolistsReducer = (
  state: TodolistReducerStateT = initialState,
  action: ActionsT
): TodolistReducerStateT => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.id);
    case "ADD-TODOLIST":
      return [
        { id: action.todolistId, title: action.title, filter: "all" },
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
  filter: FilterValuesType,
  id: string
): ChangeTodolistFilterAT => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter,
  };
};
