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

export type AppRootStateT = ReturnType<typeof rootReducer>;
export type AppDispatchT<AT extends Action> = ThunkDispatch<
  AppRootStateT,
  unknown,
  AT
>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});
