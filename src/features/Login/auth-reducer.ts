import { setAppStatusAC, setAppSuccessAC } from "../../app/app-reducer";
import {authAPI, FieldErrorT, LoginParamsT} from "../../api/todolists-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import {AxiosError} from "axios";

// * types

export type LoginStateType = {
  isLoggedIn: boolean;
};

// * Thunks

export const loginTC = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsT, {rejectValue: {errors: Array<string>, fieldsErrors?: Array<FieldErrorT>}}>(
  "auth/login",
  async (data, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      dispatch(setAppStatusAC({ status: "loading" }));

      const res = await authAPI.login(data);

      if (res.data.resultCode === 0) {
        dispatch(setAppSuccessAC({ success: "Welcome!" }));
        dispatch(setAppStatusAC({ status: "succeeded" }));
        return { isLoggedIn: true };
      } else {
        handleServerAppError(res.data, dispatch);
        dispatch(setAppStatusAC({ status: "failed" }));
        return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsError});
      }
    } catch (err) {
      const error: AxiosError = err;
      handleServerNetworkError(error, dispatch);
      return rejectWithValue({ errors: [error.message], fieldsErrors: undefined});
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
       state.isLoggedIn = action.payload.isLoggedIn;
    });
  },
});

export const authReducer = slice.reducer;

export const { setIsLoggedInAC } = slice.actions;

//* Thunks
export const _loginTC = (data: LoginParamsT) => (dispatch: Dispatch) => {
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
