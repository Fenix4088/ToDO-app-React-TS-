import {combineReducers, createStore, applyMiddleware} from "redux";
import { todolistsReducer } from "../features/TodoLists/todolists-reducer";
import { tasksReducer } from "../features/TodoLists/tasks-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  todoLists: todolistsReducer,
  tasks: tasksReducer,
});

export type AppRootStateT = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
