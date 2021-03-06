import {combineReducers, createStore, applyMiddleware, Action} from "redux";
import { todolistsReducer } from "../features/TodoLists/todolists-reducer";
import { tasksReducer } from "../features/TodoLists/tasks-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, {ThunkDispatch} from 'redux-thunk';
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
  todoLists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  login: authReducer
});

export type AppRootStateT = ReturnType<typeof rootReducer>;
export type AppDispatchT<AT extends Action> = ThunkDispatch<AppRootStateT, unknown, AT>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

