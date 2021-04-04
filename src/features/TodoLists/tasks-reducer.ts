import {addTodolistAC, changeTodoListEntityStatusAC, removeTodolistAC, setTodoListsAC,} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskT, todoListsAPI, UpdateTaskModelType,} from "../../api/todolists-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateT} from "../../app/store";
import {setAppStatusAC, setAppSuccessAC, StatusT,} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError,} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

// * types
export type TasksThunkT<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateT,
  unknown,
  any
>;

export type TaskStateT = {
  [key: string]: Array<TaskDomainT>;
};

export type TaskDomainT = TaskT & {
  entityTaskStatus: StatusT;
};

export type UpdateDomainTaskModelT = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

//* Thunks

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", (todoListId: string, thunkAPI) => {
  const {dispatch} = thunkAPI;

  dispatch(setAppStatusAC({ status: "loading" }));
  dispatch(
      changeTodoListEntityStatusAC({ todoListId, entityStatus: "loading" })
  );
  return todoListsAPI
      .getTasks(todoListId)
      .then((res) => {
        dispatch(setAppStatusAC({ status: "succeeded" }));
        dispatch(
            changeTodoListEntityStatusAC({ todoListId, entityStatus: "succeeded" })
        );
        return { todoListId, tasks: res.data.items };
      })
})

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  (payload: { taskId: string, todoListId: string }, thunkAPI) => {
    const {dispatch} = thunkAPI
    const {taskId, todoListId} = payload;
    dispatch(setAppStatusAC({ status: "loading" }));
    dispatch(
      setTaskLoadingStatusAC({
        taskId,
        todoListId,
        taskLoadingStatus: "loading",
      })
    );

    return todoListsAPI
      .deleteTask(taskId, todoListId)
      .then(() => {
        dispatch(setAppStatusAC({ status: "succeeded" }));
        dispatch(setAppSuccessAC({ success: "Task was deleted!" }));
        return { taskId, todoListId }
      })
      /*.catch((err) => handleServerNetworkError(err, dispatch));*/
  }
);
// * reducer
const initialState: TaskStateT = {};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTaskAC(state, action: PayloadAction<{ task: TaskT }>) {
      state[action.payload.task.todoListId].unshift({
        ...action.payload.task,
        entityTaskStatus: "idle",
      });
    },
    updateTaskAC(
      state,
      action: PayloadAction<{
        taskId: string;
        todoListId: string;
        model: UpdateDomainTaskModelT;
      }>
    ) {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
    setTaskLoadingStatusAC(
      state,
      action: PayloadAction<{
        taskId: string;
        todoListId: string;
        taskLoadingStatus: StatusT;
      }>
    ) {
      const index = state[action.payload.todoListId].findIndex(
        (t) => t.id === action.payload.taskId
      );

      state[action.payload.todoListId][index].entityTaskStatus =
        action.payload.taskLoadingStatus;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todoList.id] = [];
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.todoListId];
    });
    builder.addCase(setTodoListsAC, (state, action) => {
      action.payload.todoLists.forEach((tl) => {
        state[tl.id] = [];
      });
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state[action.payload.todoListId] = action.payload.tasks.map((t) => ({
        ...t,
        entityTaskStatus: "idle",
      }));
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    });
  },
});

export const tasksReducer = slice.reducer;
export const {
  addTaskAC,
  updateTaskAC,
  setTaskLoadingStatusAC,
} = slice.actions;

//* Thunks


export const createTask = (todoListId: string, title: string): TasksThunkT => (
  dispatch
) => {
  dispatch(setAppStatusAC({ status: "loading" }));
  dispatch(
    changeTodoListEntityStatusAC({ todoListId, entityStatus: "loading" })
  );
  todoListsAPI
    .createTask(todoListId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC({ task: res.data.data.item }));
        dispatch(setAppStatusAC({ status: "succeeded" }));
        dispatch(
          changeTodoListEntityStatusAC({
            todoListId,
            entityStatus: "succeeded",
          })
        );
        dispatch(setAppSuccessAC({ success: "Task was added!" }));
      } else {
        handleServerAppError(res.data, dispatch);
        dispatch(
          changeTodoListEntityStatusAC({ todoListId, entityStatus: "failed" })
        );
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
      dispatch(
        changeTodoListEntityStatusAC({ todoListId, entityStatus: "failed" })
      );
    });
};

export const updateTask = (
  taskId: string,
  todoListId: string,
  domainModel: UpdateDomainTaskModelT
): TasksThunkT => (dispatch, getState) => {
  const state = getState();
  const task = state.tasks[todoListId].find((t) => t.id === taskId);

  dispatch(
    setTaskLoadingStatusAC({ taskId, todoListId, taskLoadingStatus: "loading" })
  );
  if (!task) {
    throw new Error("Task no found in the STATE");
  }

  const apiModel: UpdateTaskModelType = {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: TaskPriorities.Low,
    startDate: task.startDate,
    deadline: task.deadline,
    ...domainModel,
  };

  todoListsAPI
    .updateTask(taskId, todoListId, apiModel)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(updateTaskAC({ taskId, todoListId, model: domainModel }));
        dispatch(setAppSuccessAC({ success: "Task was updated!" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
      dispatch(
        setTaskLoadingStatusAC({
          taskId,
          todoListId,
          taskLoadingStatus: "succeeded",
        })
      );
    })
    .catch((err) => handleServerNetworkError(err, dispatch));
};
