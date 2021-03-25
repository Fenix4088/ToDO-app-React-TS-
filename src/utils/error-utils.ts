import {
  setAppErrorAC,
  SetAppErrorAT,
  setAppStatusAC,
  setAppStatusAT,
} from "../app/app-reducer";
import { ResponseT } from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppDispatchT } from "../app/store";

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

export const handleServerNetworkError = (
  err: { message: string },
  dispatch: AppDispatchT<SetAppErrorAT | setAppStatusAT>
): void => {
  dispatch(setAppErrorAC(err.message ? err.message : "Unknown error!"));
  dispatch(setAppStatusAC("failed"));
};
