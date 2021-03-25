import React from "react";
import { Provider } from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import { v1 } from "uuid";
import { tasksReducer } from "../features/TodoLists/tasks-reducer";
import { todolistsReducer } from "../features/TodoLists/todolists-reducer";
import { AppRootStateT } from "../app/store";
import { TaskPriorities, TaskStatuses } from "../api/todolists-api";
import {appReducer} from "../app/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todolistsReducer,
  app: appReducer,
    login: authReducer
});

const initialGlobalState = {
  todoLists: [
    {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
      entityStatus: "idle",
      addedDate: "",
      order: 1,
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "all",
      entityStatus: "loading",
      addedDate: "",
      order: 1,
    },
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: v1(),
        title: "HTML&CSS",
        entityTaskStatus: "idle",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        order: 1,
        addedDate: "",
        todoListId: "todolistId1",
      },
      {
        id: v1(),
        title: "JS",
        entityTaskStatus: "idle",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        order: 1,
        addedDate: "",
        todoListId: "todolistId1",
      },
    ],
    ["todolistId2"]: [
      {
        id: v1(),
        title: "Milk",
        entityTaskStatus: "idle",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        order: 1,
        addedDate: "",
        todoListId: "todolistId2",
      },
      {
        id: v1(),
        title: "React Book",
        entityTaskStatus: "idle",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        order: 1,
        addedDate: "",
        todoListId: "todolistId2",
      },
    ],
  },
  app: {
    status: "idle",
    isInitialized: false,
    appActionStatus: {
      error: null,
      success: null,
    },
  },
    login: {
    isLoggedIn: false
  }
};

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppRootStateT,
    applyMiddleware(thunk)
);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
);
