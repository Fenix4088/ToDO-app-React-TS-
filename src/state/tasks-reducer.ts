import {
  AddTodolistAT,
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
} from "../api/todolists-api";
import { ThunkAction } from "redux-thunk";
import { AppRootStateT } from "./store";

type ActionsT =
  | RemoveTaskAT
  | AddTaskAT
  | UpdateTaskAT
  | AddTodolistAT
  | RemoveTodolistAT
  | SetTodoListsAT
  | SetTasksAT;

enum TasksActionsTypes {
  REMOVE_TASK = "REMOVE-TASK",
  ADD_TASK = "ADD-TASK",
  UPDATE_TASK = "CHANGE-TASK-STATUS",
  SET_TASKS = "SET-TASKS",
}

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
export type AddTaskAT = ReturnType<typeof addTaskAC>;
export type UpdateTaskAT = ReturnType<typeof updateTaskAC>;
export type SetTasksAT = ReturnType<typeof setTasksAC>;

export type TasksThunkT<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateT,
  unknown,
  ActionsT
>;

export type TaskStateT = {
  [key: string]: Array<TaskT>;
};

export type UpdateDomainTaskModelT = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

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
        [action.todoListID]: action.tasks,
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

//* Thunks
export const fetchTasks = (TodoListId: string): TasksThunkT => (dispatch) => {
  todoListsAPI
    .getTasks(TodoListId)
    .then((res) => dispatch(setTasksAC(TodoListId, res.data.items)));
};

export const deleteTask = (taskId: string, todoListId: string): TasksThunkT => (
  dispatch
) => {
  todoListsAPI.deleteTask(taskId, todoListId).then(() => {
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

export const updateTask = (
  taskId: string,
  todoListId: string,
  domainModel: UpdateDomainTaskModelT
): TasksThunkT => (dispatch, getState) => {
  const state = getState();
  const task = state.tasks[todoListId].find((t) => t.id === taskId);

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
    .then(() => dispatch(updateTaskAC(taskId, todoListId, domainModel)));
};
