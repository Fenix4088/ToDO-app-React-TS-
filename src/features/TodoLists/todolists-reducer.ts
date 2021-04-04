import { todoListsAPI, TodolistT } from "../../api/todolists-api";
import { ThunkAction } from "redux-thunk";
import { AppRootStateT } from "../../app/store";
import {
  setAppSuccessAC,
  setAppStatusAC,
  StatusT,
} from "../../app/app-reducer";
import { handleServerNetworkError } from "../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

// * types
export type FilterValuesT = "all" | "active" | "completed";

export type TodolistDomainT = TodolistT & {
  filter: FilterValuesT;
  entityStatus: StatusT;
};

export type TodolistReducerStateT = Array<TodolistDomainT>;

export type TodoListThunkT<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateT,
  unknown,
  any
>;


export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>;
export type AddTodolistAT = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>;
export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>;
export type changeTodoListEntityStatusAT = ReturnType<
    typeof changeTodoListEntityStatusAC
    >;


export enum TodolistsActionTypes {
  SET_TODO_LISTS = "SET-TODO-LISTS",
  REMOVE_TODOLIST = "REMOVE-TODOLIST",
  ADD_TODOLIST = "ADD-TODOLIST",
  CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE",
  CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER",
  CHANGE_TODO_LIST_ENTITY_STATUS = "CHANGE-TODO-LIST-ENTITY-STATUS",
}

// * reducer
const initialState: TodolistReducerStateT = [];

const slice = createSlice({
  name: "todolist",
  initialState: initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ todoListId: string }>) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todoListId
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todoList: TodolistT }>) {
      state.unshift({
        ...action.payload.todoList,
        filter: "all",
        entityStatus: "idle",
      });
    },
    changeTodolistTitleAC(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      const index = state.findIndex(
          (tl) => tl.id === action.payload.id
      );
      state[index].title = action.payload.title;
    },
    changeTodolistFilterAC(
      state,
      action: PayloadAction<{ filter: FilterValuesT; id: string }>
    ) {
      const index = state.findIndex(
          (tl) => tl.id === action.payload.id
      );
      state[index].filter = action.payload.filter;
    },
    setTodoListsAC(
      state,
      action: PayloadAction<{ todoLists: Array<TodolistT> }>
    ) {
      return action.payload.todoLists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    },
    changeTodoListEntityStatusAC(
      state,
      action: PayloadAction<{ todoListId: string; entityStatus: StatusT }>
    ) {
      const index = state.findIndex(
          (tl) => tl.id === action.payload.todoListId
      );
      state[index].entityStatus = action.payload.entityStatus;
    },
  },
});

export const todolistsReducer = slice.reducer;


export const {
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  setTodoListsAC,
  changeTodoListEntityStatusAC,
} = slice.actions;



// * Thunks
export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }));
  todoListsAPI
    .getTodolists()
    .then((res) => {
      dispatch(setTodoListsAC({ todoLists: res.data }));
      dispatch(setAppStatusAC({ status: "succeeded" }));
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const deleteTodoList = (todoListId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }));
  dispatch(
    changeTodoListEntityStatusAC({ todoListId, entityStatus: "loading" })
  );

  todoListsAPI
    .deleteTodoList(todoListId)
    .then(() => {
      dispatch(removeTodolistAC({ todoListId }));
      dispatch(setAppStatusAC({ status: "succeeded" }));
      dispatch(setAppSuccessAC({ success: "Todolist was deleted!" }));
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const createTodoList = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }));
  todoListsAPI
    .createTodoList(title)
    .then((res) => {
      dispatch(addTodolistAC({ todoList: res.data.data.item }));
      dispatch(setAppStatusAC({ status: "succeeded" }));
      dispatch(setAppSuccessAC({ success: "Todolist was added!" }));
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const updateTodoList = (todoListId: string, title: string) => (
  dispatch: Dispatch
) => {
  todoListsAPI
    .updateTodolist(todoListId, title)
    .then(() => {
      dispatch(changeTodolistTitleAC({ id: todoListId, title }));
      dispatch(setAppSuccessAC({ success: "Todolist was updated!" }));
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};
