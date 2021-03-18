// * types
export type InitialStateT = {
  status: StatusT;
  appActionStatus: appActionStatusT;
};

export type appActionStatusT = {
  error: string | null;
  success: string | null;
};

export type StatusT = "idle" | "loading" | "succeeded" | "failed";

enum appActionsConst {
  APP_SET_STATUS = "APP/SET-STATUS",
  APP_SET_ERROR = "APP/SET-ERROR",
  APP_SET_SUCCESS = "APP/SET-SUCCESS",
}

type ActionsT = SetAppErrorAT | setAppStatusAT | setAppSuccessAT;

export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>;
export type setAppStatusAT = ReturnType<typeof setAppStatusAC>;
export type setAppSuccessAT = ReturnType<typeof setAppSuccessAC>;

// * reducer
const initialState: InitialStateT = {
  status: "idle",
  appActionStatus: {
    error: null,
    success: null,
  },
};

export const appReducer = (
  state: InitialStateT = initialState,
  action: ActionsT
): InitialStateT => {
  const { APP_SET_STATUS, APP_SET_ERROR, APP_SET_SUCCESS } = appActionsConst;

  switch (action.type) {
    case APP_SET_STATUS: {
      return { ...state, status: action.status };
    }
    case APP_SET_ERROR: {
      return {
        ...state,
        appActionStatus: {
          ...state.appActionStatus,
          error: action.error,
          success: null,
        },
      };
    }
    case APP_SET_SUCCESS: {
      return {
        ...state,
        appActionStatus: {
          ...state.appActionStatus,
          error: null,
          success: action.success,
        },
      };
    }
    default:
      return state;
  }
};

// * AC
export const setAppErrorAC = (error: string | null) => {
  return {
    type: appActionsConst.APP_SET_ERROR,
    error,
  } as const;
};

export const setAppStatusAC = (status: StatusT) => {
  return {
    type: appActionsConst.APP_SET_STATUS,
    status,
  } as const;
};

export const setAppSuccessAC = (success: string | null) => {
  return {
    type: appActionsConst.APP_SET_SUCCESS,
    success,
  } as const;
};

// * TC
