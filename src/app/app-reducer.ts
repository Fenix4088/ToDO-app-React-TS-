// * types
import { ThunkAction } from "redux-thunk";
import { AppRootStateT } from "./store";
import { authAPI } from "../api/todolists-api";
import { setIsLoggedInAC } from "../features/Login/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export type AppReducerThunkT<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateT,
  unknown,
  any
>;

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

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.appActionStatus.error = action.payload.error;
      state.appActionStatus.success = null;
    },
    setAppSuccessAC(state, action: PayloadAction<{ success: string | null }>) {
      state.appActionStatus.success = action.payload.success;
      state.appActionStatus.error = null;
    },
    setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value;
    },
    setAppStatusAC(state, action: PayloadAction<{ status: StatusT }>) {
      state.status = action.payload.status;
    },
  },
});

export const appReducer = slice.reducer;
export const {
  setAppErrorAC,
  setAppSuccessAC,
  setAppInitializedAC,
  setAppStatusAC
} = slice.actions;


// * TC
export const initializeAppTC = (): AppReducerThunkT => (dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ value: true }));
    }
    dispatch(setAppInitializedAC({ value: true }));
  });
};
