import { v1 } from "uuid";
import {
  TodolistReducerStateT,
  todolistsReducer,
  ChangeTodolistFilterAT,
  ChangeTodolistTitleAT,
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
} from "./todolists-reducer";
import { FilterValuesType } from "../App";

let startState: TodolistReducerStateT;
const todoListId1 = v1();
const todoListId2 = v1();

beforeEach(function () {
  startState = [
    {
      id: todoListId1,
      title: "What to learn",
      filter: "all",
    },
    {
      id: todoListId2,
      title: "What to buy",
      filter: "all",
    },
  ];
});

test("todolist should be remove", () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todoListId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("todolist should be added", () => {
  const newTodoListTitle = "New Todolist";

  const endState = todolistsReducer(
    startState,
    addTodolistAC(newTodoListTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodoListTitle);
  expect(endState[0].filter).toBe("all");
});

test("todolist should changed its name", () => {
  const newTodoListTitle = "New Todolist";

  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC(newTodoListTitle, todoListId2)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodoListTitle);
  expect(endState.length).toBe(2);
});

test("todolist should changed filter name", () => {
  const newFilter: FilterValuesType = "completed";

  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC(newFilter, todoListId2)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
  expect(endState.length).toBe(2);
  expect(startState[1] !== endState[1]).toBe(true);
});
