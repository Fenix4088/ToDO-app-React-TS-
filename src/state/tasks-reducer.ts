import { TaskStateTyp, TaskType } from "../App";
import { v1 } from "uuid";
import { AddTodolistAT, RemoveTodolistAT } from "./todolists-reducer";

type ActionsT =
  | RemoveTaskT
  | AddTaskT
  | ChangeTaskStatusT
  | ChangeTaskTitleT
  | AddTodolistAT
  | RemoveTodolistAT;

export type RemoveTaskT = {
  type: "REMOVE-TASK";
  taskId: string;
  todoListID: string;
};
export type AddTaskT = {
  type: "ADD-TASK";
  title: string;
  todoListID: string;
};

export type ChangeTaskStatusT = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  isDone: boolean;
  todoListID: string;
};

export type ChangeTaskTitleT = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  title: string;
  todoListID: string;
};

export const tasksReducer = (
  state: TaskStateTyp,
  action: ActionsT
): TaskStateTyp => {
  switch (action.type) {
    case "REMOVE-TASK": {
      let copyState = { ...state };
      copyState[action.todoListID] = copyState[action.todoListID].filter(
        (task) => task.id !== action.taskId
      );
      return copyState;
    }
    case "ADD-TASK": {
      const task: TaskType = {
        id: v1(),
        title: action.title,
        isDone: false,
      };
      return {
        ...state,
        [action.todoListID]: [task, ...state[action.todoListID]],
      };
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map((t) =>
          t.id === action.taskId ? { ...t, isDone: action.isDone } : t
        ),
      };
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map((t) =>
          t.id === action.taskId ? { ...t, title: action.title } : t
        ),
      };
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state};
      delete copyState[action.id];
      return copyState;
    }
    default:
      throw new Error("Action in userReducer is not valid!");
  }
};

export const removeTaskAC = (
  taskId: string,
  todoListID: string
): RemoveTaskT => {
  return {
    type: "REMOVE-TASK",
    taskId,
    todoListID,
  };
};
export const addTaskAC = (title: string, todoListID: string): AddTaskT => {
  return {
    type: "ADD-TASK",
    title,
    todoListID,
  };
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todoListID: string
): ChangeTaskStatusT => {
  return {
    type: "CHANGE-TASK-STATUS",
    taskId,
    todoListID,
    isDone,
  };
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todoListID: string
): ChangeTaskTitleT => {
  return {
    type: "CHANGE-TASK-TITLE",
    taskId,
    todoListID,
    title,
  };
};
