import { v1 } from "uuid";
import { AddTodolistAT, RemoveTodolistAT } from "./todolists-reducer";
import { TaskPriorities, TaskStatuses, TaskT } from "../api/todolists-api";

type ActionsT =
  | RemoveTaskT
  | AddTaskT
  | ChangeTaskStatusT
  | ChangeTaskTitleT
  | AddTodolistAT
  | RemoveTodolistAT;

enum ActionsTypes {
  REMOVE_TASK = "REMOVE-TASK",
  ADD_TASK = "ADD-TASK",
  CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS",
  CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE",
}

export type RemoveTaskT = {
  type: typeof ActionsTypes.REMOVE_TASK;
  taskId: string;
  todoListID: string;
};
export type AddTaskT = {
  type: typeof ActionsTypes.ADD_TASK;
  title: string;
  todoListID: string;
};

export type ChangeTaskStatusT = {
  type: typeof ActionsTypes.CHANGE_TASK_STATUS;
  taskId: string;
  checked: boolean;
  todoListID: string;
};

export type ChangeTaskTitleT = {
  type: typeof ActionsTypes.CHANGE_TASK_TITLE;
  taskId: string;
  title: string;
  todoListID: string;
};

export type TaskStateT = {
  [key: string]: Array<TaskT>;
};

const initialState: TaskStateT = {};

export const tasksReducer = (
  state: TaskStateT = initialState,
  action: ActionsT
): TaskStateT => {
  const {REMOVE_TASK, ADD_TASK, CHANGE_TASK_TITLE, CHANGE_TASK_STATUS} = ActionsTypes
  switch (action.type) {
    case REMOVE_TASK: {
      let copyState = { ...state };
      copyState[action.todoListID] = copyState[action.todoListID].filter(
        (task) => task.id !== action.taskId
      );
      return copyState;
    }
    case ADD_TASK: {
      const task: TaskT = {
        id: v1(),
        title: action.title,
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        order: 1,
        addedDate: "",
        todoListId: action.todoListID,
      };
      return {
        ...state,
        [action.todoListID]: [task, ...state[action.todoListID]],
      };
    }
    case CHANGE_TASK_STATUS: {
      const isStatus = action.checked
        ? TaskStatuses.Completed
        : TaskStatuses.New;

      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map((t) =>
          t.id === action.taskId ? { ...t, status: isStatus } : t
        ),
      };
    }
    case CHANGE_TASK_TITLE: {
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
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    default:
      return state;
  }
};


export const removeTaskAC = (
  taskId: string,
  todoListID: string
): RemoveTaskT => {
  return {
    type: ActionsTypes.REMOVE_TASK,
    taskId,
    todoListID,
  };
};
export const addTaskAC = (title: string, todoListID: string): AddTaskT => {
  return {
    type: ActionsTypes.ADD_TASK,
    title,
    todoListID,
  };
};
export const changeTaskStatusAC = (
  taskId: string,
  checked: boolean,
  todoListID: string
): ChangeTaskStatusT => {
  return {
    type: ActionsTypes.CHANGE_TASK_STATUS,
    taskId,
    todoListID,
    checked,
  };
};
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todoListID: string
): ChangeTaskTitleT => {
  return {
    type: ActionsTypes.CHANGE_TASK_TITLE,
    taskId,
    todoListID,
    title,
  };
};
