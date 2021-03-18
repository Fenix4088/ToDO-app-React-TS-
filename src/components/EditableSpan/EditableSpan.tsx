import React, { ChangeEvent, useCallback, useState } from "react";
import { TextField } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

type EditableSpanPropsType = {
  taskTitle: string;
  changeTitle: (newTitle: string) => void;
  disabled?: boolean
};



export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const useStyles = makeStyles({
    input: {
      width: "70%",
    },
    editableSpan: {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "70%",
      overflowWrap: "anywhere",
      opacity: `${props.disabled ? "0.5" : "1"}`
    },
  });


  const { changeTitle, taskTitle } = props;
  const classes = useStyles();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(taskTitle);

  const onEditMode = () => setEditMode(true);

  const offEditMode = useCallback(() => {
    setEditMode(false);
    if (title.trim()) changeTitle(title.trim());
  }, [title, changeTitle]);

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value),
    []
  );

  return editMode ? (
    <TextField
      className={classes.input}
      value={title}
      onBlur={offEditMode}
      onChange={onChangeTitle}
      autoFocus
    />
  ) : (
    <span onDoubleClick={onEditMode} className={classes.editableSpan} >
      {taskTitle}
    </span>
  );
});
