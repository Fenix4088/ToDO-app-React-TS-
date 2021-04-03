import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateT } from "../../app/store";
import {appActionStatusT, setAppErrorAC, setAppSuccessAC} from "../../app/app-reducer";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function CustomizedSnackbars() {
  const appActionStatus = useSelector<AppRootStateT, appActionStatusT>(
    (state) => state.app.appActionStatus
  );

  const message = appActionStatus.error || appActionStatus.success;
  const snackbarType = appActionStatus.error ? "error" : "success";


  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAppErrorAC({error: null}));
    dispatch(setAppSuccessAC({success: null}));
  };

  return (
    <Snackbar open={!!appActionStatus.error || !!appActionStatus.success} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={snackbarType}>
        {message}
      </Alert>
    </Snackbar>
  );
}
