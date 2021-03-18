import React from "react";
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
// import { useDispatch, useSelector } from "react-redux";
// import { AppRootStateT } from "../../app/store";
// import {setAppSuccessAC} from "../../app/app-reducer";
//
// function Alert(props: AlertProps) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
//
// export function CustomizedSnackbars() {
//   const success = useSelector<AppRootStateT, string | null>(
//     (state) => state.app.success
//   );
//
//   const dispatch = useDispatch();
//
//   const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     dispatch(setAppSuccessAC(null));
//   };
//
//   return (
//     <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
//       <Alert onClose={handleClose} severity="success">
//         {success}
//       </Alert>
//     </Snackbar>
//   );
// }
