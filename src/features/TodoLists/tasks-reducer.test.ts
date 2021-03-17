import {
  addTaskAC,
  updateTaskAC,
  removeTaskAC, setTasksAC,
  tasksReducer,
  TaskStateT,
} from "./tasks-reducer";
import {
  addTodolistAC,
  removeTodolistAC,
  setTodoListsAC,
} from "./todolists-reducer";
import { v1 } from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

let startState: TaskStateT;
const todoListId1 = v1();
const todoListId2 = v1();

beforeEach(function () {
  startState = {
    [todoListId1]: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        description: "",
        priority: 0,
        startDate: "",
        deadline: "",
        todoListId: todoListId1,
        order: 1,
        addedDate: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        description: "",
        priority: 0,
        startDate: "",
        deadline: "",
        todoListId: todoListId1,
        order: 1,
        addedDate: "",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        description: "",
        priority: 0,
        startDate: "",
        deadline: "",
        todoListId: todoListId1,
        order: 1,
        addedDate: "",
      },
    ],
    [todoListId2]: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        description: "",
        priority: 0,
        startDate: "",
        deadline: "",
        todoListId: todoListId2,
        order: 1,
        addedDate: "",
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        description: "",
        priority: 0,
        startDate: "",
        deadline: "",
        todoListId: todoListId2,
        order: 1,
        addedDate: "",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        description: "",
        priority: 0,
        startDate: "",
        deadline: "",
        todoListId: todoListId2,
        order: 1,
        addedDate: "",
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const action = removeTaskAC("2", todoListId2);
  const endState = tasksReducer(startState, action);

  expect(startState[todoListId2].length).toBe(3);
  expect(endState[todoListId2].length).toBe(2);
  expect(endState[todoListId2] === startState[todoListId2]).toBeFalsy();
  expect(endState[todoListId2].some(el => el.id !== "2")).toBeTruthy();
  expect(endState[todoListId2].some(el => el.title !== "milk")).toBeTruthy();
  expect(endState[todoListId1].length === startState[todoListId1].length).toBeTruthy();

});

test("correct task should be added to correct array", () => {
  const action = addTaskAC({
    id: "3",
    title: "juce",
    status: TaskStatuses.New,
    description: "",
    priority: 0,
    startDate: "",
    deadline: "",
    todoListId: todoListId2,
    order: 1,
    addedDate: "",
  });

  const endState = tasksReducer(startState, action);

  expect(endState[todoListId1].length).toBe(3);
  expect(endState[todoListId2].length).toBe(4);
  expect(endState[todoListId2][0].id).toBeDefined();
  expect(endState[todoListId2][0].title).toBe("juce");
  expect(endState[todoListId2][0].status).toBe(TaskStatuses.New);
});

test("status of specified task should be changed", () => {
  const action = updateTaskAC("1", todoListId2, {
    title: "Updated task",
    description: "I am update task",
    status: TaskStatuses.Completed,
    priority: 1,
    startDate: "string",
    deadline: "string",
  });

  const endState = tasksReducer(startState, action);
  console.log(endState)
  expect(endState[todoListId2].length).toBe(endState[todoListId2].length)

  expect(endState[todoListId2].length === startState[todoListId2].length).toBeTruthy();
  expect(endState[todoListId2][0].status).toBe(TaskStatuses.Completed);
  expect(startState[todoListId2][0].status).toBe(TaskStatuses.New);

});

test("new array should be added when new todolist is added", () => {
  //@ts-ignore
  const action = addTodolistAC("new todolist");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== todoListId1 && k !== todoListId2);
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const action = removeTodolistAC(todoListId2);

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todoListId2]).not.toBeDefined();
});

test("empty arrays should be added when we set todolists", () => {
  const action = setTodoListsAC([
    { id: "1", title: "title1", order: 0, addedDate: "" },
    { id: "2", title: "title2", order: 0, addedDate: "" },
  ]);

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);
  expect(keys.length).toBe(2);
  expect(endState['1']).toBeDefined();
  expect(endState['2']).toBeDefined();


});

test("tasks should be added to TodoList", () => {
  const action = setTasksAC(todoListId1, startState[todoListId1]);

  const endState = tasksReducer({
    [todoListId1]: [],
    [todoListId2]: []
  }, action);

  expect(endState[todoListId1].length).toBe(3);
  expect(endState[todoListId2].length).toBe(0);

});
