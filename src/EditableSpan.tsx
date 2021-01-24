import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { TextField } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

type EditableSpanPropsType = {
  title: string;
  changeTitle: (newTitle: string) => void;
};

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
  },
});

export const EditableSpan = (props: EditableSpanPropsType) => {
  const classes = useStyles();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.title);

  const onEditMode = (): void => setEditMode(true);
  const offEditMode = (): void => {
    setEditMode(false);
    if (title.trim()) props.changeTitle(title.trim());
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>): void =>
    setTitle(e.currentTarget.value);

  return editMode ? (
    <TextField
      className={classes.input}
      value={title}
      onBlur={offEditMode}
      onChange={changeTitle}
      autoFocus
    />
  ) : (
    <span onDoubleClick={onEditMode} className={classes.editableSpan}>
      {props.title}
    </span>
  );
};
