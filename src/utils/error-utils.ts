import {
  setAppErrorAC,
  setAppStatusAC,
} from "../app/app-reducer";
import { ResponseT } from "../api/todolists-api";
import { Dispatch } from "redux";

export const handleServerAppError = <D>(
  data: ResponseT<D>,
  dispatch: Dispatch
): void => {
  if (data.messages[0]) {
    dispatch(setAppErrorAC({error: data.messages[0]}));
  } else {
    dispatch(setAppErrorAC({error: "Unknown error :-("}));
  }
  dispatch(setAppStatusAC({status: "failed"}));
};

export const handleServerNetworkError = (
  err: { message: string },
  dispatch: Dispatch
): void => {
  dispatch(setAppErrorAC({error: err.message ? err.message : "Unknown error!"}));
  dispatch(setAppStatusAC({status: "failed"}));
};
