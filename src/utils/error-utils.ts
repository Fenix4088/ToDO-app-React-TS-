import {
  setAppErrorAC,
  SetAppErrorAT,
  setAppStatusAC,
  setAppStatusAT,
} from "../app/app-reducer";
import { ResponseT } from "../api/todolists-api";
import {Action, Dispatch} from "redux";
import { AppDispatchT } from "../app/store";
import {PutEffect} from "@redux-saga/core/effects";

export const handleServerAppError = <D>(
  data: ResponseT<D>,
  dispatch: AppDispatchT<SetAppErrorAT | setAppStatusAT>
): void => {
  if (data.messages[0]) {
    dispatch(setAppErrorAC(data.messages[0]));
  } else {
    dispatch(setAppErrorAC("Unknown error :-("));
  }
  dispatch(setAppStatusAC("failed"));
};

// <A extends Action>(action: A): PutEffect<A>

export const handleServerNetworkError = (
  err: { message: string },
  put: AppDispatchT<SetAppErrorAT | setAppStatusAT>
): void => {
  put(setAppErrorAC(err.message ? err.message : "Unknown error!"));
  put(setAppStatusAC("failed"));
};
