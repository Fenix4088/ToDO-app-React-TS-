import {
    AddTodolistAT,
    changeTodoListEntityStatusAC,
    changeTodoListEntityStatusAT,
    RemoveTodolistAT,
    SetTodoListsAT,
    TodolistsActionTypes,
} from "./todolists-reducer";
import {
    GetTasksResponse,
    TaskPriorities,
    TaskStatuses,
    TaskT,
    todoListsAPI,
    UpdateTaskModelType,
} from "../../api/todolists-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateT} from "../../app/store";
import {
    SetAppErrorAT,
    setAppStatusAC,
    setAppStatusAT,
    setAppSuccessAC,
    setAppSuccessAT,
    StatusT,
} from "../../app/app-reducer";
import {
    handleServerAppError,
    handleServerNetworkError,
} from "../../utils/error-utils";
import {call, put, takeEvery, takeLeading} from "redux-saga/effects";
import {AxiosResponse} from "axios";

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


export type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
export type AddTaskAT = ReturnType<typeof addTaskAC>;
export type UpdateTaskAT = ReturnType<typeof updateTaskAC>;
export type SetTasksAT = ReturnType<typeof setTasksAC>;
export type setTaskLoadingStatusAT = ReturnType<typeof setTaskLoadingStatusAC>;

export type TasksThunkT<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateT,
    unknown,
    | ActionsT
    | SetAppErrorAT
    | setAppStatusAT
    | changeTodoListEntityStatusAT
    | setAppSuccessAT>;

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

type SagasTasksActionsT = {
    FETCH_TASKS: "SAGA/TASKS/FETCH-TASKS",
    DELETE_TASK: "SAGA/TASKS/DELETE-TASK"
}

// * reducer
const initialState: TaskStateT = {};

enum TasksActionsTypes {
    REMOVE_TASK = "REMOVE-TASK",
    ADD_TASK = "ADD-TASK",
    UPDATE_TASK = "CHANGE-TASK-STATUS",
    SET_TASKS = "SET-TASKS",
    SET_TASK_LOADING_STATUS = "SET-TASK-LOADING-STATUS",
}

export const sagasTasksActions: SagasTasksActionsT = {
    FETCH_TASKS: "SAGA/TASKS/FETCH-TASKS",
    DELETE_TASK: "SAGA/TASKS/DELETE-TASK"
}

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
            const {task} = action;
            return {
                ...state,
                [task.todoListId]: [
                    {...task, entityTaskStatus: "idle"},
                    ...state[task.todoListId],
                ],
            };
        }
        case UPDATE_TASK: {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map((t) =>
                    t.id === action.taskId ? {...t, ...action.model} : t
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
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case TodolistsActionTypes.SET_TODO_LISTS: {
            const stateCopy = {...state};
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

// * Sagas
export function* fetchTasksWorker(action: ReturnType<typeof fetchTasksSA>) {
    yield put(setAppStatusAC("loading"));
    yield put(changeTodoListEntityStatusAC(action.todoListId, "loading"));
    const res: AxiosResponse<GetTasksResponse> = yield call(todoListsAPI.getTasks, action.todoListId)
    try {
        yield put(setTasksAC(action.todoListId, res.data.items));
        yield put(setAppStatusAC("succeeded"));
        yield put(changeTodoListEntityStatusAC(action.todoListId, "succeeded"));
    } catch (err) {
        handleServerNetworkError(err, put)
    }
}
export function* fetchTasksWatcher() {
    yield takeEvery(sagasTasksActions.FETCH_TASKS, fetchTasksWorker)
}
export const fetchTasksSA = (todoListId: string) => ({type: sagasTasksActions.FETCH_TASKS, todoListId} as const)

export function* deleteTaskWorker(action: ReturnType<typeof deleteTaskSA>) {
    yield put(setAppStatusAC("loading"));
    yield put(setTaskLoadingStatusAC(action.taskId, action.todoListId, "loading"));

    yield call(todoListsAPI.deleteTask, action.taskId, action.todoListId)
    try {
        yield put(removeTaskAC(action.taskId, action.todoListId));
        yield put(setAppStatusAC("succeeded"));
        yield put(setAppSuccessAC("Task was deleted!"));
    } catch (err) {
        handleServerNetworkError(err, put)
    }
}

export function* deleteTaskWatcher() {
    yield takeEvery(sagasTasksActions.DELETE_TASK, deleteTaskWorker)
}

export const deleteTaskSA = (taskId: string, todoListId: string) => ({type: sagasTasksActions.DELETE_TASK, taskId, todoListId} as const)

//* Thunks

// export const deleteTask = (taskId: string, todoListId: string): TasksThunkT => (
//     dispatch
// ) => {
//     dispatch(setAppStatusAC("loading"));
//     dispatch(setTaskLoadingStatusAC(taskId, todoListId, "loading"));
//
//     todoListsAPI
//         .deleteTask(taskId, todoListId)
//         .then(() => {
//             dispatch(removeTaskAC(taskId, todoListId));
//             dispatch(setAppStatusAC("succeeded"));
//             dispatch(setAppSuccessAC("Task was deleted!"));
//         })
//         .catch((err) => handleServerNetworkError(err, dispatch));
// };

export const createTask = (todoListId: string, title: string): TasksThunkT => (
    dispatch
) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTodoListEntityStatusAC(todoListId, "loading"));
    todoListsAPI
        .createTask(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item));
                dispatch(setAppStatusAC("succeeded"));
                dispatch(changeTodoListEntityStatusAC(todoListId, "succeeded"));
                dispatch(setAppSuccessAC("Task was added!"));
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
                dispatch(setAppSuccessAC("Task was updated!"));
            } else {
                handleServerAppError(res.data, dispatch);
            }
            dispatch(setTaskLoadingStatusAC(taskId, todoListId, "succeeded"));
        })
        .catch((err) => handleServerNetworkError(err, dispatch));
};
