import React, {ChangeEvent, CSSProperties, useCallback} from "react";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import { Box, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { deleteTask, TaskDomainT, updateTask } from "../../tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { TaskStatuses, TaskT } from "../../../../api/todolists-api";
import { TasksPreloader } from "../../../../components/TasksPreloader/TaskspPreloader";

export type TodoListItemType = {
  todoListId: string;
  task: TaskDomainT;
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
  const { task, todoListId } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

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
      <Box style={{ position: "relative" }}>
        <span className={`${task.entityTaskStatus !== "loading" ? "visibility" : ""}`}>
          <TasksPreloader size={"20"} type={"circle"} />
        </span>
        <Checkbox
          className={`${task.entityTaskStatus === "loading" ? "visibility" : ""}`}
          onChange={changeTaskStatus}
          checked={task.status === TaskStatuses.Completed}
          color={"primary"}
        />
        <EditableSpan taskTitle={task.title} changeTitle={changeTitle} disabled={task.entityTaskStatus === "loading"}/>
      </Box>
      <IconButton onClick={removeTask} disabled={task.entityTaskStatus === "loading"}>
        <Delete />
      </IconButton>
    </li>
  );
});
