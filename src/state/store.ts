import {combineReducers, createStore, applyMiddleware} from "redux";
import { todolistsReducer } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  todoLists: todolistsReducer,
  tasks: tasksReducer,
});

export type AppRootStateT = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
