import React, { ChangeEvent } from "react";
import { EditableSpan } from "./EditableSpan";
import { Box, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TaskT,
} from "./state/tasks-reducer";
import { useDispatch } from "react-redux";

type TodoListItemType = {
  id: string;
  task: TaskT;
};

const useStyles = makeStyles({
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "250px",
  },
});

export const TodoListItem: React.FC<TodoListItemType> = React.memo((props) => {
  console.log("TodoListItem called", props.task.title);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { task } = props;

  const removeTask = () => {
    dispatch(removeTaskAC(task.id, props.id));
  };
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    dispatch(changeTaskStatusAC(task.id, checked, props.id));
  };

  const changeTitle = (newTitle: string): void => {
    dispatch(changeTaskTitleAC(task.id, newTitle, props.id));
  };

  return (
    <li className={`${task.isDone ? "is-done" : ""} ${classes.listItem}`}>
      <Box>
        <Checkbox
          onChange={changeTaskStatus}
          checked={task.isDone}
          color={"primary"}
        />
        <EditableSpan title={task.title} changeTitle={changeTitle} />
      </Box>
      <IconButton onClick={removeTask}>
        <Delete />
      </IconButton>
    </li>
  );
});
