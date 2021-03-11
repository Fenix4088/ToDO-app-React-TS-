
import {
  AddTodolistAT,
  RemoveTodolistAT,
  SetTodoListsAT,
  TodolistsActionTypes,
} from "./todolists-reducer";
import {
  TaskStatuses,
  TaskT,
  todoListsAPI,
} from "../api/todolists-api";
import { ThunkAction } from "redux-thunk";
import { AppRootStateT } from "./store";

type ActionsT =
  | RemoveTaskT
  | AddTaskT
  | ChangeTaskStatusT
  | ChangeTaskTitleT
  | AddTodolistAT
  | RemoveTodolistAT
  | SetTodoListsAT
  | SetTasksAT;

enum TasksActionsTypes {
  REMOVE_TASK = "REMOVE-TASK",
  ADD_TASK = "ADD-TASK",
  CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS",
  CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE",
  SET_TASKS = "SET-TASKS",
}

export type RemoveTaskT = {
  type: typeof TasksActionsTypes.REMOVE_TASK;
  taskId: string;
  todoListID: string;
};
export type AddTaskT = {
  type: typeof TasksActionsTypes.ADD_TASK;
  task: TaskT;
};

export type ChangeTaskStatusT = {
  type: typeof TasksActionsTypes.CHANGE_TASK_STATUS;
  taskId: string;
  checked: boolean;
  todoListID: string;
};

export type ChangeTaskTitleT = {
  type: typeof TasksActionsTypes.CHANGE_TASK_TITLE;
  taskId: string;
  title: string;
  todoListID: string;
};

export type SetTasksAT = {
  type: typeof TasksActionsTypes.SET_TASKS;
  tasks: Array<TaskT>;
  todoListID: string;
};

export type TasksThunkT<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateT,
  unknown,
  ActionsT
>;

export type TaskStateT = {
  [key: string]: Array<TaskT>;
};

const initialState: TaskStateT = {};

export const tasksReducer = (
  state: TaskStateT = initialState,
  action: ActionsT
): TaskStateT => {
  const {
    REMOVE_TASK,
    ADD_TASK,
    CHANGE_TASK_TITLE,
    CHANGE_TASK_STATUS,
    SET_TASKS,
  } = TasksActionsTypes;

  switch (action.type) {
    case REMOVE_TASK: {
      let copyState = { ...state };
      copyState[action.todoListID] = copyState[action.todoListID].filter(
        (task) => task.id !== action.taskId
      );
      return copyState;
    }
    case ADD_TASK: {
      const { task } = action;

      return {
        ...state,
        [task.todoListId]: [task, ...state[task.todoListId]],
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
    case TodolistsActionTypes.ADD_TODOLIST: {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }
    case TodolistsActionTypes.REMOVE_TODOLIST: {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    case TodolistsActionTypes.SET_TODO_LISTS: {
      const stateCopy = { ...state };

      action.todoLists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });

      return stateCopy;
    }

    case SET_TASKS: {
      return {
        ...state,
        [action.todoListID]: action.tasks,
      };
    }
    default:
      return state;
  }
};

// * Action Creators

export const removeTaskAC = (
  taskId: string,
  todoListID: string
): RemoveTaskT => {
  return {
    type: TasksActionsTypes.REMOVE_TASK,
    taskId,
    todoListID,
  };
};
export const addTaskAC = (task: TaskT): AddTaskT => {
  return {
    type: TasksActionsTypes.ADD_TASK,
    task,
  };
};
export const changeTaskStatusAC = (
  taskId: string,
  checked: boolean,
  todoListID: string
): ChangeTaskStatusT => {
  return {
    type: TasksActionsTypes.CHANGE_TASK_STATUS,
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
    type: TasksActionsTypes.CHANGE_TASK_TITLE,
    taskId,
    todoListID,
    title,
  };
};

export const setTasksAC = (
  todoListID: string,
  tasks: Array<TaskT>
): SetTasksAT => {
  return {
    type: TasksActionsTypes.SET_TASKS,
    todoListID,
    tasks,
  };
};

//* Thunks

export const fetchTasks = (TodoListId: string): TasksThunkT => (dispatch) => {
  todoListsAPI
    .getTasks(TodoListId)
    .then((res) => dispatch(setTasksAC(TodoListId, res.data.items)));
};

export const deleteTask = (taskId: string, todoListId: string): TasksThunkT => (
  dispatch
) => {
  todoListsAPI.deleteTask(taskId, todoListId).then((res) => {
    dispatch(removeTaskAC(taskId, todoListId));
  });
};

export const createTask = (todoListId: string, title: string): TasksThunkT => (
  dispatch
) => {
  todoListsAPI
    .createTask(todoListId, title)
    .then((res) => dispatch(addTaskAC(res.data.data.item)));
};
