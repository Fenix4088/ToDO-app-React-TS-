import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseT} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseT<D>, dispatch: Dispatch):void => {
    if (data.messages[0]) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC("Unknown error :-("));
    }
    dispatch(setAppStatusAC("failed"));
}

export const handleServerNetworkError = (err: {message: string}, dispatch: Dispatch):void => {
    dispatch(setAppErrorAC(err.message ? err.message : "Unknown error!" ));
    dispatch(setAppStatusAC("failed"));
}