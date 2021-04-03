import {
  AddTodolistAT,
  changeTodoListEntityStatusAC,
  RemoveTodolistAT,
  SetTodoListsAT,
  TodolistsActionTypes,
} from "./todolists-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskT,
  todoListsAPI,
  UpdateTaskModelType,
} from "../../api/todolists-api";
import { ThunkAction } from "redux-thunk";
import { AppRootStateT } from "../../app/store";
import {
  setAppStatusAC,
  setAppSuccessAC,
  StatusT,
} from "../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";

// * types
type ActionsT =
  | RemoveTaskAT
  | AddTaskAT
  | UpdateTaskAT
  | AddTodolistAT
  | RemoveTodolistAT
  | SetTodoListsAT
  | SetTasksAT
  | setTaskLoadingStatusAT;

enum TasksActionsTypes {
  REMOVE_TASK = "REMOVE-TASK",
  ADD_TASK = "ADD-TASK",
  UPDATE_TASK = "CHANGE-TASK-STATUS",
  SET_TASKS = "SET-TASKS",
  SET_TASK_LOADING_STATUS = "SET-TASK-LOADING-STATUS",
}

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
export type AddTaskAT = ReturnType<typeof addTaskAC>;
export type UpdateTaskAT = ReturnType<typeof updateTaskAC>;
export type SetTasksAT = ReturnType<typeof setTasksAC>;
export type setTaskLoadingStatusAT = ReturnType<typeof setTaskLoadingStatusAC>;

export type TasksThunkT<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateT,
  unknown,
  any
>;

export type TaskStateT = {
  [key: string]: Array<TaskDomainT>;
};

export type TaskDomainT = TaskT & {
  entityTaskStatus: StatusT;
};

export type UpdateDomainTaskModelT = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

// * reducer
const initialState: TaskStateT = {};

export const tasksReducer = (
  state: TaskStateT = initialState,
  action: ActionsT
): TaskStateT => {
  const {
    REMOVE_TASK,
    ADD_TASK,
    UPDATE_TASK,
    SET_TASKS,
    SET_TASK_LOADING_STATUS,
  } = TasksActionsTypes;

  switch (action.type) {
    case REMOVE_TASK: {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].filter(
          (task) => task.id !== action.taskId
        ),
      };
    }
    case ADD_TASK: {
      const { task } = action;
      return {
        ...state,
        [task.todoListId]: [
          { ...task, entityTaskStatus: "idle" },
          ...state[task.todoListId],
        ],
      };
    }
    case UPDATE_TASK: {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map((t) =>
          t.id === action.taskId ? { ...t, ...action.model } : t
        ),
      };
    }
    case TodolistsActionTypes.ADD_TODOLIST: {
      return {
        ...state,
        [action.todoList.id]: [],
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
        [action.todoListID]: action.tasks.map((t) => ({
          ...t,
          entityTaskStatus: "idle",
        })),
      };
    }
    case SET_TASK_LOADING_STATUS: {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map((t) =>
          t.id === action.taskId
            ? {
                ...t,
                entityTaskStatus: action.taskLoadingStatus,
              }
            : t
        ),
      };
    }
    default:
      return state;
  }
};

// * Action Creators
export const removeTaskAC = (taskId: string, todoListID: string) => {
  return {
    type: TasksActionsTypes.REMOVE_TASK,
    taskId,
    todoListID,
  } as const;
};

export const addTaskAC = (task: TaskT) => {
  return {
    type: TasksActionsTypes.ADD_TASK,
    task,
  } as const;
};

export const updateTaskAC = (
  taskId: string,
  todoListID: string,
  model: UpdateDomainTaskModelT
) => {
  return {
    type: TasksActionsTypes.UPDATE_TASK,
    taskId,
    todoListID,
    model,
  } as const;
};

export const setTasksAC = (todoListID: string, tasks: Array<TaskT>) => {
  return {
    type: TasksActionsTypes.SET_TASKS,
    todoListID,
    tasks,
  } as const;
};

export const setTaskLoadingStatusAC = (
  taskId: string,
  todoListID: string,
  taskLoadingStatus: StatusT
) => {
  return {
    type: TasksActionsTypes.SET_TASK_LOADING_STATUS,
    taskId,
    todoListID,
    taskLoadingStatus,
  } as const;
};

//* Thunks
export const fetchTasks = (todoListId: string): TasksThunkT => (dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  dispatch(changeTodoListEntityStatusAC(todoListId, "loading"));
  todoListsAPI
    .getTasks(todoListId)
    .then((res) => {
      dispatch(setTasksAC(todoListId, res.data.items));
      dispatch(setAppStatusAC({status: "succeeded"}));
      dispatch(changeTodoListEntityStatusAC(todoListId, "succeeded"));
    })
    .catch((err) => handleServerNetworkError(err, dispatch));
};

export const deleteTask = (taskId: string, todoListId: string): TasksThunkT => (
  dispatch
) => {
  dispatch(setAppStatusAC({status: "loading"}));
  dispatch(setTaskLoadingStatusAC(taskId, todoListId, "loading"));

  todoListsAPI
    .deleteTask(taskId, todoListId)
    .then(() => {
      dispatch(removeTaskAC(taskId, todoListId));
      dispatch(setAppStatusAC({status: "succeeded"}));
      dispatch(setAppSuccessAC({success: "Task was deleted!"}));
    })
    .catch((err) => handleServerNetworkError(err, dispatch));
};

export const createTask = (todoListId: string, title: string): TasksThunkT => (
  dispatch
) => {
  dispatch(setAppStatusAC({status: "loading"}));
  dispatch(changeTodoListEntityStatusAC(todoListId, "loading"));
  todoListsAPI
    .createTask(todoListId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item));
        dispatch(setAppStatusAC({status: "succeeded"}));
        dispatch(changeTodoListEntityStatusAC(todoListId, "succeeded"));
        dispatch(setAppSuccessAC({success: "Task was added!"}));
      } else {
        handleServerAppError(res.data, dispatch);
        dispatch(changeTodoListEntityStatusAC(todoListId, "failed"));
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
      dispatch(changeTodoListEntityStatusAC(todoListId, "failed"));
    });
};

export const updateTask = (
  taskId: string,
  todoListId: string,
  domainModel: UpdateDomainTaskModelT
): TasksThunkT => (dispatch, getState) => {
  const state = getState();
  const task = state.tasks[todoListId].find((t) => t.id === taskId);

  dispatch(setTaskLoadingStatusAC(taskId, todoListId, "loading"));
  if (!task) {
    throw new Error("Task no found in the STATE");
  }

  const apiModel: UpdateTaskModelType = {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: TaskPriorities.Low,
    startDate: task.startDate,
    deadline: task.deadline,
    ...domainModel,
  };

  todoListsAPI
    .updateTask(taskId, todoListId, apiModel)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(updateTaskAC(taskId, todoListId, domainModel));
        dispatch(setAppSuccessAC({success: "Task was updated!"}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
      dispatch(setTaskLoadingStatusAC(taskId, todoListId, "succeeded"));
    })
    .catch((err) => handleServerNetworkError(err, dispatch));
};
