import { AppRootStateT } from "../../app/store";
import { ThunkAction } from "redux-thunk";
import {
  setAppStatusAC,
  setAppStatusAT,
  setAppSuccessAC,
  setAppSuccessAT,
} from "../../app/app-reducer";
import { authAPI, LoginParamsT } from "../../api/todolists-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";

// * types
type ActionsT = setIsLoggedInAT;

export type setIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>;

enum LoginActionsTypes {
  SET_IS_LOGGED_IN = "SET-IS-LOGGED-IN",
}

export type LoginThunkT<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateT,
  unknown,
  ActionsT | setAppStatusAT | setAppSuccessAT
>;

export type LoginStateType = {
  isLoggedIn: boolean;
};

// * reducer
const initialState: LoginStateType = {
  isLoggedIn: false,
};

export const authReducer = (
  state: LoginStateType = initialState,
  action: ActionsT
): LoginStateType => {
  const { SET_IS_LOGGED_IN } = LoginActionsTypes;
  switch (action.type) {
    case SET_IS_LOGGED_IN: {
      return { ...state, isLoggedIn: action.value };
    }
    default:
      return state;
  }
};

// * Action Creators

export const setIsLoggedInAC = (value: boolean) => {
  return {
    type: LoginActionsTypes.SET_IS_LOGGED_IN,
    value,
  } as const;
};

//* Thunks
export const loginTC = (data: LoginParamsT): LoginThunkT => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppSuccessAC("Welcome!"));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
        dispatch(setAppStatusAC("failed"));
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch));
};
export const logoutTC = (): LoginThunkT => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false));
        dispatch(setAppSuccessAC("Bue!"));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
        dispatch(setAppStatusAC("failed"));
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch));
};
