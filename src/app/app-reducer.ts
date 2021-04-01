// * types
import {ThunkAction} from "redux-thunk";
import {AppRootStateT} from "./store";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC, setIsLoggedInAT} from "../features/Login/auth-reducer";
import {put, call, takeLeading } from "redux-saga/effects";
// import {put, call} from 'redux-saga/effects'

export type InitialStateT = {
    status: StatusT;
    isInitialized: boolean;
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
    SET_APP_INITIALIZED = "APP/SET-APP-INITIALIZED",
}

export type AppReducerThunkT<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateT,
    unknown,
    ActionsT | setIsLoggedInAT>;

type ActionsT = SetAppErrorAT | setAppStatusAT | setAppSuccessAT | setAppInitializedAT;

export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>;
export type setAppStatusAT = ReturnType<typeof setAppStatusAC>;
export type setAppSuccessAT = ReturnType<typeof setAppSuccessAC>;
export type setAppInitializedAT = ReturnType<typeof setAppInitializedAC>;

// * reducer
const initialState: InitialStateT = {
    status: "idle",
    // true if you entered correct email and password before and you have valid cookies
    isInitialized: false,
    appActionStatus: {
        error: null,
        success: null,
    },
};

export const appReducer = (
    state: InitialStateT = initialState,
    action: ActionsT
): InitialStateT => {
    const {APP_SET_STATUS, APP_SET_ERROR, APP_SET_SUCCESS, SET_APP_INITIALIZED} = appActionsConst;

    switch (action.type) {
        case APP_SET_STATUS: {
            return {...state, status: action.status};
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
        case SET_APP_INITIALIZED: {
            return {...state, isInitialized: action.value}
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
export const setAppInitializedAC = (value: boolean) => {
    return {
        type: appActionsConst.SET_APP_INITIALIZED,
        value,
    } as const;
};

// * SAGAs

function* initializeAppWorkerSaga() {
    const res = yield call(authAPI.me)
    if (res.data.resultCode === 0) {
        yield put(setIsLoggedInAC(true));
    }
    yield put(setAppInitializedAC(true));

}

export function* initializeAppWatcherSaga() {
    yield takeLeading( "APP/INIT_APP_SAGA", initializeAppWorkerSaga);
}
