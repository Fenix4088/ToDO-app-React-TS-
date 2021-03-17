
// * types
type InitialStateT = {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};

enum appActionsConst  {
    APP_SET_STATUS = "APP/SET-STATUS",
    APP_SET_ERROR = "APP/SET-ERROR"
}

type ActionsT = SetErrorAT | any;

export type SetErrorAT = ReturnType<typeof setErrorAC>

// * reducer
const initialState: InitialStateT = {
    status: "idle",
    error: null,
}

export const appReducer = (state: InitialStateT = initialState, action: ActionsT):InitialStateT => {
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
export const setErrorAC = (error: string | null) => {
    return {
        type: appActionsConst.APP_SET_ERROR,
        error
    } as const;
}

// * TC