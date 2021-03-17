import { todoListsAPI, TodolistT } from "../../api/todolists-api";
import { ThunkAction } from "redux-thunk";
import { AppRootStateT } from "../../app/store";

// * types
export type FilterValuesT = "all" | "active" | "completed";

export type TodolistDomainT = TodolistT & {
  filter: FilterValuesT;
};

export type TodolistReducerStateT = Array<TodolistDomainT>;

type ActionsT =
  | RemoveTodolistAT
  | AddTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT
  | SetTodoListsAT;

export enum TodolistsActionTypes {
  SET_TODO_LISTS = "SET-TODO-LISTS",
  REMOVE_TODOLIST = "REMOVE-TODOLIST",
  ADD_TODOLIST = "ADD-TODOLIST",
  CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE",
  CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER",
}

export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>;
export type AddTodolistAT = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>;
export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>;

export type TodoListThunkT<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateT,
  unknown,
  ActionsT
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
  } = TodolistsActionTypes;

  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter((tl) => tl.id !== action.id);
    case ADD_TODOLIST: {
      return [
        {
          ...action.todoList,
          filter: "all",
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
    case SET_TODO_LISTS:
      return action.todoLists.map((tl) => ({ ...tl, filter: "all" }));
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

// * Thunks
export const fetchTodoListsTC = (): TodoListThunkT => (dispatch) => {
  todoListsAPI.getTodolists().then((res) => dispatch(setTodoListsAC(res.data)));
};

export const deleteTodoList = (todoListId: string): TodoListThunkT => (
  dispatch
) => {
  todoListsAPI
    .deleteTodoList(todoListId)
    .then(() => dispatch(removeTodolistAC(todoListId)));
};

export const createTodoList = (title: string): TodoListThunkT => (dispatch) => {
  todoListsAPI
    .createTodoList(title)
    .then((res) => dispatch(addTodolistAC(res.data.data.item)));
};

export const updateTodoList = (
  todoListId: string,
  title: string
): TodoListThunkT => (dispatch) => {
  todoListsAPI
    .updateTodolist(todoListId, title)
    .then(() => dispatch(changeTodolistTitleAC(todoListId, title)));
};
