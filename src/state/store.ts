import { combineReducers, createStore } from "redux";
import { todolistsReducer } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  todoLists: todolistsReducer,
  tasks: tasksReducer,
});

export type AppRootStateT = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools());
