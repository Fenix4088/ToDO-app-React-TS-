import { setAppStatusAC, setAppSuccessAC } from "../../app/app-reducer";
import { authAPI, LoginParamsT } from "../../api/todolists-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

// * types

export type LoginStateType = {
  isLoggedIn: boolean;
};

// * reducer
const initialState: LoginStateType = {
  isLoggedIn: false,
};

// ** slice
const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
});

export const authReducer = slice.reducer;

export const { setIsLoggedInAC } = slice.actions;

//* Thunks
export const loginTC = (data: LoginParamsT) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }));
  authAPI
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }));
        dispatch(setAppSuccessAC({ success: "Welcome!" }));
        dispatch(setAppStatusAC({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
        dispatch(setAppStatusAC({ status: "failed" }));
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch));
};
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: false }));
        dispatch(setAppSuccessAC({ success: "Bue!" }));
        dispatch(setAppStatusAC({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
        dispatch(setAppStatusAC({ status: "failed" }));
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch));
};
