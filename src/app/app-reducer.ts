// * types
export type InitialStateT = {
    status: StatusT;
    error: string | null;
};

export type StatusT = "idle" | "loading" | "succeeded" | "failed";

enum appActionsConst {
    APP_SET_STATUS = "APP/SET-STATUS",
    APP_SET_ERROR = "APP/SET-ERROR",
}

type ActionsT = SetAppErrorAT | setAppStatusAT ;

export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type setAppStatusAT = ReturnType<typeof setAppStatusAC>

// * reducer
const initialState: InitialStateT = {
    status: "idle",
    error: null,
}

export const appReducer = (state: InitialStateT = initialState, action: ActionsT): InitialStateT => {
    const {APP_SET_STATUS, APP_SET_ERROR} = appActionsConst;

    switch (action.type) {
        case APP_SET_STATUS: {
            return {...state, status: action.status};
        }
        case APP_SET_ERROR: {
            return {...state, error: action.error};
        }
        default:
            return state;
    }

}

// * AC
export const setAppErrorAC = (error: string | null) => {
    return {
        type: appActionsConst.APP_SET_ERROR,
        error
    } as const;
}

export const setAppStatusAC = (status: StatusT) => {
    return {
        type: appActionsConst.APP_SET_STATUS,
        status
    } as const;
}


// * TC