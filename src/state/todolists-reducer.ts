import { v1 } from "uuid";
import { TodolistT } from "../api/todolists-api";

export type FilterValuesT = "all" | "active" | "completed";

export type TodolistDomainT = TodolistT & {
  filter: FilterValuesT;
};

export type TodolistReducerStateT = Array<TodolistDomainT>;

type ActionsT =
  | RemoveTodolistAT
  | AddTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT;

enum TodolistsActionTypes {
  REMOVE_TODOLIST = "REMOVE-TODOLIST",
  ADD_TODOLIST = "ADD-TODOLIST",
  CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE",
  CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER",
}

export type RemoveTodolistAT = {
  type: typeof TodolistsActionTypes.REMOVE_TODOLIST;
  id: string;
};
export type AddTodolistAT = {
  type: typeof TodolistsActionTypes.ADD_TODOLIST;
  title: string;
  todolistId: string;
};
export type ChangeTodolistTitleAT = {
  type: typeof TodolistsActionTypes.CHANGE_TODOLIST_TITLE;
  id: string;
  title: string;
};
export type ChangeTodolistFilterAT = {
  type: typeof TodolistsActionTypes.CHANGE_TODOLIST_FILTER;
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
  const {
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE,
    ADD_TODOLIST,
    REMOVE_TODOLIST,
  } = TodolistsActionTypes;

  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter((tl) => tl.id !== action.id);
    case ADD_TODOLIST:
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: "all",
          addedDate: "",
          order: 1,
        },
        ...state,
      ];
    case CHANGE_TODOLIST_TITLE:
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );
    case CHANGE_TODOLIST_FILTER:
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
  return {
    type: TodolistsActionTypes.REMOVE_TODOLIST,
    id: todolistId,
  };
};
export const addTodolistAC = (title: string): AddTodolistAT => {
  return {
    type: TodolistsActionTypes.ADD_TODOLIST,
    title,
    todolistId: v1(),
  };
};
export const changeTodolistTitleAC = (
  title: string,
  id: string
): ChangeTodolistTitleAT => {
  return {
    type: TodolistsActionTypes.CHANGE_TODOLIST_TITLE,
    title,
    id,
  };
};
export const changeTodolistFilterAC = (
  filter: FilterValuesT,
  id: string
): ChangeTodolistFilterAT => {
  return {
    type: TodolistsActionTypes.CHANGE_TODOLIST_FILTER,
    id,
    filter,
  };
};
