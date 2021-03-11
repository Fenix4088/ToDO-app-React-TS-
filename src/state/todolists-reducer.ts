import { v1 } from "uuid";
import { todoListsAPI, TodolistT } from "../api/todolists-api";
import { ThunkAction } from "redux-thunk";
import { AppRootStateT } from "./store";

export type FilterValuesT = "all" | "active" | "completed";

export type TodolistDomainT = TodolistT & {
  filter: FilterValuesT;
};

export type TodolistReducerStateT = Array<TodolistDomainT>;

type ActionsT =
  | RemoveTodolistAT
  | AddTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT
  | SetTodoListsAT;

export enum TodolistsActionTypes {
  SET_TODO_LISTS = "SET-TODO-LISTS ",
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
  todoList: TodolistT;
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
export type SetTodoListsAT = {
  type: typeof TodolistsActionTypes.SET_TODO_LISTS;
  todoLists: Array<TodolistT>;
};

export type TodoListThunkT<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateT,
  unknown,
  ActionsT
>;

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
    SET_TODO_LISTS,
  } = TodolistsActionTypes;

  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter((tl) => tl.id !== action.id);
    case ADD_TODOLIST: {
      const newTodoList: TodolistDomainT = {
        ...action.todoList,
        filter: "all",
      };
      return [newTodoList, ...state];
    }
    case CHANGE_TODOLIST_TITLE:
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );
    case CHANGE_TODOLIST_FILTER:
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    case SET_TODO_LISTS:
      return action.todoLists.map((tl) => ({ ...tl, filter: "all" }));
    default:
      return state;
  }
};

// * Action creators
export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
  return {
    type: TodolistsActionTypes.REMOVE_TODOLIST,
    id: todolistId,
  };
};

export const addTodolistAC = (todoList: TodolistT): AddTodolistAT => {
  return {
    type: TodolistsActionTypes.ADD_TODOLIST,
    todoList,
  };
};

export const changeTodolistTitleAC = (
  id: string,
  title: string
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

export const setTodoListsAC = (todoLists: Array<TodolistT>): SetTodoListsAT => {
  return {
    type: TodolistsActionTypes.SET_TODO_LISTS,
    todoLists,
  };
};

// * Thunks
export const fetchTodoListsTC = (): TodoListThunkT => (dispatch) => {
  todoListsAPI.getTodolists().then((res) => dispatch(setTodoListsAC(res.data)));
};

export const deleteTodoList = (todoListId: string): TodoListThunkT => (
  dispatch
) => {
  todoListsAPI
    .deleteTodoList(todoListId)
    .then((res) => dispatch(removeTodolistAC(todoListId)));
};

export const createTodoList = (title: string): TodoListThunkT => (dispatch) => {
  todoListsAPI
    .createTodoList(title)
    .then((res) => dispatch(addTodolistAC(res.data.data.item)));
};

export const updateTodoList = (
  todoListId: string,
  title: string
): TodoListThunkT => (dispatch) => {
  todoListsAPI
    .updateTodolist(todoListId, title)
    .then((res) => dispatch(changeTodolistTitleAC(todoListId, title)));
};
