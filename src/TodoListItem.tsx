import React, { ChangeEvent } from "react";
import { EditableSpan } from "./EditableSpan";
import { Box, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {TaskT} from "./state/tasks-reducer";

type TodoListItemType = {
  id: string;
  task: TaskT;
  removeTask: (taskId: string, id: string) => void;
  changeStatus: (taskId: string, isDone: boolean, id: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todoListID: string
  ) => void;
};

const useStyles = makeStyles({
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "250px",
  },
});

export const TodoListItem: React.FC<TodoListItemType> = (props) => {
  const classes = useStyles();
  const { task } = props;

  const removeTask = () => {
    props.removeTask(task.id, props.id);
  };
  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    props.changeStatus(task.id, checked, props.id);
  };

  const changeTitle = (newTitle: string): void => {
    props.changeTaskTitle(task.id, newTitle, props.id);
  };

  return (
    <li className={`${task.isDone ? "is-done" : ""} ${classes.listItem}`}>
      <Box>
        <Checkbox
          onChange={onCheckboxChange}
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
};
