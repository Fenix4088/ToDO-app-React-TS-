import { v1 } from "uuid";
import {
  TodolistReducerStateT,
  removeTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC, FilterValuesT, setTodoListsAC, todolistsReducer, addTodolistAC,
} from "./todolists-reducer";

let startState: TodolistReducerStateT;
const todoListId1 = v1();
const todoListId2 = v1();

beforeEach(function () {
  startState = [
    {
      id: todoListId1,
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 1
    },
    {
      id: todoListId2,
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 1
    },
  ];
});

test("todolist should be remove", () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todoListId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("todolist should be added", () => {
  const newTodoList = {
    id: "12",
    title: "Added TodoList",
    addedDate: "today",
    order: 7,
  };

  const endState = todolistsReducer(
    startState,
    addTodolistAC(newTodoList)
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodoList.title);
  expect(endState[0].filter).toBe("all");
});

test("todolist should changed its name", () => {
  const newTodoListTitle = "New Todolist";

  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC(todoListId2, newTodoListTitle)
  );


  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodoListTitle);
  expect(endState.length).toBe(2);
});

test("todolist should changed filter name", () => {
  const newFilter: FilterValuesT = "completed";

  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC(newFilter, todoListId2)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
  expect(endState.length).toBe(2);
  expect(startState[1] !== endState[1]).toBe(true);
});

test("todoLists should be set", () => {

  const action = setTodoListsAC(startState);
  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);

});
