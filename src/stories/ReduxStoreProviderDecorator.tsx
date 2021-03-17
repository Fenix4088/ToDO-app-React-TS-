import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { v1 } from "uuid";
import { tasksReducer } from "../features/TodoLists/tasks-reducer";
import { todolistsReducer } from "../features/TodoLists/todolists-reducer";
import { AppRootStateT } from "../app/store";
import { TaskPriorities, TaskStatuses } from "../api/todolists-api";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todolistsReducer,
});

const initialGlobalState = {
  todoLists: [
    {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 1,
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 1,
    },
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: v1(),
        title: "HTML&CSS",
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
};

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppRootStateT
);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
);
