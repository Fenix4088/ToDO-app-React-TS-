// * types
export type InitialStateT = {
    status: StatusT;
    tasksLoadStatus: StatusT;
    error: string | null;
};

export type StatusT = "idle" | "loading" | "succeeded" | "failed";

enum appActionsConst {
    APP_SET_STATUS = "APP/SET-STATUS",
    APP_SET_ERROR = "APP/SET-ERROR",
    APP_SET_TASK_LOAD_STATUS = "APP/APP-SET-TASK-LOAD-STATUS"
}

type ActionsT = SetErrorAT | setStatusAT | setTasksLoadStatusAT;

export type SetErrorAT = ReturnType<typeof setErrorAC>
export type setStatusAT = ReturnType<typeof setStatusAC>
export type setTasksLoadStatusAT = ReturnType<typeof setTasksLoadStatusAC>

// * reducer
const initialState: InitialStateT = {
    status: "idle",
    tasksLoadStatus: "loading",
    error: null,
}

export const appReducer = (state: InitialStateT = initialState, action: ActionsT): InitialStateT => {
    const {APP_SET_STATUS, APP_SET_ERROR, APP_SET_TASK_LOAD_STATUS} = appActionsConst;

    switch (action.type) {
        case APP_SET_STATUS: {
            return {...state, status: action.status};
        }
        case APP_SET_ERROR: {
            return {...state, error: action.error};
        }
        case APP_SET_TASK_LOAD_STATUS: {
            return {...state, tasksLoadStatus: action.status};
        }
        default:
            return state;
    }

}

// * AC
export const setErrorAC = (error: string | null) => {
    return {
        type: appActionsConst.APP_SET_ERROR,
        error
    } as const;
}

export const setStatusAC = (status: StatusT) => {
    return {
        type: appActionsConst.APP_SET_STATUS,
        status
    } as const;
}

export const setTasksLoadStatusAC = (status: StatusT) => {
    return {
        type: appActionsConst.APP_SET_TASK_LOAD_STATUS,
        status
    } as const;
}

// * TC