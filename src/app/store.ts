import { combineReducers, Action } from "redux";
import { todolistsReducer } from "../features/TodoLists/todolists-reducer";
import { tasksReducer } from "../features/TodoLists/tasks-reducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "../features/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  todoLists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  login: authReducer,
});
export type RootReducerT = typeof rootReducer;
export type AppRootStateT = ReturnType<RootReducerT>;


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});
