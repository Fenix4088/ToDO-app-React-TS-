import React, { ChangeEvent, useCallback } from "react";
import { EditableSpan } from "./EditableSpan";
import { Box, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { deleteTask, updateTask } from "./state/tasks-reducer";
import { useDispatch } from "react-redux";
import { TaskStatuses, TaskT } from "./api/todolists-api";

export type TodoListItemType = {
  todoListId: string;
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

export const Task: React.FC<TodoListItemType> = React.memo((props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { task, todoListId } = props;

  const removeTask = useCallback(() => {
    dispatch(deleteTask(task.id, todoListId));
  }, [dispatch, todoListId, task.id]);

  const changeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.currentTarget;
      const status = checked ? TaskStatuses.Completed : TaskStatuses.New;

      dispatch(updateTask(task.id, todoListId, { status }));
    },
    [dispatch, todoListId, task.id]
  );

  const changeTitle = useCallback(
    (newTitle: string): void => {
      dispatch(updateTask(task.id, todoListId, { title: newTitle }));
    },
    [dispatch, todoListId, task.id]
  );

  return (
    <li
      className={`${task.status === TaskStatuses.Completed ? "is-done" : ""} ${
        classes.listItem
      }`}
    >
      <Box>
        <Checkbox
          onChange={changeTaskStatus}
          checked={task.status === TaskStatuses.Completed}
          color={"primary"}
        />
        <EditableSpan taskTitle={task.title} changeTitle={changeTitle} />
      </Box>
      <IconButton onClick={removeTask}>
        <Delete />
      </IconButton>
    </li>
  );
});
