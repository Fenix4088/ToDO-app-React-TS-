import { todoListsAPI, TodolistT } from "../../api/todolists-api";
import { ThunkAction } from "redux-thunk";
import { AppRootStateT } from "../../app/store";
import {
  setAppStatusAC,
  setAppStatusAT,
  setAppSuccessAC,
  setAppSuccessAT,
  StatusT,
} from "../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";

// * types
export type FilterValuesT = "all" | "active" | "completed";

export type TodolistDomainT = TodolistT & {
  filter: FilterValuesT;
  entityStatus: StatusT;
};

export type TodolistReducerStateT = Array<TodolistDomainT>;

type ActionsT =
  | RemoveTodolistAT
  | AddTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT
  | SetTodoListsAT
  | changeTodoListEntityStatusAT;

export enum TodolistsActionTypes {
  SET_TODO_LISTS = "SET-TODO-LISTS",
  REMOVE_TODOLIST = "REMOVE-TODOLIST",
  ADD_TODOLIST = "ADD-TODOLIST",
  CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE",
  CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER",
  CHANGE_TODO_LIST_ENTITY_STATUS = "CHANGE-TODO-LIST-ENTITY-STATUS",
}

export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>;
export type AddTodolistAT = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>;
export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>;
export type changeTodoListEntityStatusAT = ReturnType<
  typeof changeTodoListEntityStatusAC
>;

export type TodoListThunkT<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateT,
  unknown,
  ActionsT | setAppStatusAT | setAppSuccessAT
>;

// * reducer
const initialState: TodolistReducerStateT = [];

export const todolistsReducer = (
  state: TodolistReducerStateT = initialState,
  action: ActionsT
): TodolistReducerStateT => {
  const {
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE,
    ADD_TODOLIST,
    REMOVE_TODOLIST,
    SET_TODO_LISTS,
    CHANGE_TODO_LIST_ENTITY_STATUS,
  } = TodolistsActionTypes;

  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter((tl) => tl.id !== action.id);
    case ADD_TODOLIST: {
      return [
        {
          ...action.todoList,
          filter: "all",
          entityStatus: "idle",
        },
        ...state,
      ];
    }
    case CHANGE_TODOLIST_TITLE:
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );
    case CHANGE_TODOLIST_FILTER:
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    case CHANGE_TODO_LIST_ENTITY_STATUS: {
      return state.map((tl) =>
        tl.id === action.todoListId
          ? { ...tl, entityStatus: action.entityStatus }
          : tl
      );
    }
    case SET_TODO_LISTS:
      return action.todoLists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    default:
      return state;
  }
};

// * Action creators
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: TodolistsActionTypes.REMOVE_TODOLIST,
    id: todolistId,
  } as const;
};

export const addTodolistAC = (todoList: TodolistT) => {
  return {
    type: TodolistsActionTypes.ADD_TODOLIST,
    todoList,
  } as const;
};

export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: TodolistsActionTypes.CHANGE_TODOLIST_TITLE,
    title,
    id,
  } as const;
};

export const changeTodolistFilterAC = (filter: FilterValuesT, id: string) => {
  return {
    type: TodolistsActionTypes.CHANGE_TODOLIST_FILTER,
    id,
    filter,
  } as const;
};

export const setTodoListsAC = (todoLists: Array<TodolistT>) => {
  return {
    type: TodolistsActionTypes.SET_TODO_LISTS,
    todoLists,
  } as const;
};

export const changeTodoListEntityStatusAC = (
  todoListId: string,
  entityStatus: StatusT
) => {
  return {
    type: TodolistsActionTypes.CHANGE_TODO_LIST_ENTITY_STATUS,
    entityStatus,
    todoListId,
  } as const;
};

// * Thunks
export const fetchTodoListsTC = (): TodoListThunkT => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todoListsAPI
    .getTodolists()
    .then((res) => {
      dispatch(setTodoListsAC(res.data));
      dispatch(setAppStatusAC("succeeded"));
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const deleteTodoList = (todoListId: string): TodoListThunkT => (
  dispatch
) => {
  dispatch(setAppStatusAC("loading"));
  dispatch(changeTodoListEntityStatusAC(todoListId, "loading"));

  todoListsAPI
    .deleteTodoList(todoListId)
    .then(() => {
      dispatch(removeTodolistAC(todoListId));
      dispatch(setAppStatusAC("succeeded"));
      dispatch(setAppSuccessAC("Todolist was deleted!"));
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const createTodoList = (title: string): TodoListThunkT => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todoListsAPI
    .createTodoList(title)
    .then((res) => {
      dispatch(addTodolistAC(res.data.data.item));
      dispatch(setAppStatusAC("succeeded"));
      dispatch(setAppSuccessAC("Todolist was added!"));
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const updateTodoList = (
  todoListId: string,
  title: string
): TodoListThunkT => (dispatch) => {
  todoListsAPI
    .updateTodolist(todoListId, title)
    .then(() => {
      dispatch(changeTodolistTitleAC(todoListId, title));
      dispatch(setAppSuccessAC("Todolist was updated!"));
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};
