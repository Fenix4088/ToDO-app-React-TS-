import {
  addTaskAC,
  updateTaskAC,
  tasksReducer,
  TaskStateT,
  setTaskLoadingStatusAC, fetchTasks, deleteTask,
} from "./tasks-reducer";
import {
  addTodolistAC,
  removeTodolistAC,
  setTodoListsAC,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { TaskStatuses } from "../../api/todolists-api";

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
        entityTaskStatus: "idle",
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
        entityTaskStatus: "idle",
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
        entityTaskStatus: "idle",
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
        entityTaskStatus: "idle",
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
        entityTaskStatus: "idle",
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
        entityTaskStatus: "idle",
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
  const action = deleteTask.fulfilled({ taskId: "2", todoListId: todoListId2 }, "",  { taskId: "2", todoListId: todoListId2 });
  const endState = tasksReducer(startState, action);

  expect(startState[todoListId2].length).toBe(3);
  expect(endState[todoListId2].length).toBe(2);
  expect(endState[todoListId2] === startState[todoListId2]).toBeFalsy();
  expect(endState[todoListId2].some((el) => el.id !== "2")).toBeTruthy();
  expect(endState[todoListId2].some((el) => el.title !== "milk")).toBeTruthy();
  expect(
    endState[todoListId1].length === startState[todoListId1].length
  ).toBeTruthy();
});

test("correct task should be added to correct array", () => {
  const task = {
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
  };

  const action = addTaskAC({task});

  const endState = tasksReducer(startState, action);

  expect(endState[todoListId1].length).toBe(3);
  expect(endState[todoListId2].length).toBe(4);
  expect(endState[todoListId2][0].id).toBeDefined();
  expect(endState[todoListId2][0].title).toBe("juce");
  expect(endState[todoListId2][0].status).toBe(TaskStatuses.New);
});

test("status of specified task should be changed", () => {

  const model = {
    title: "Updated task",
    description: "I am update task",
    status: TaskStatuses.Completed,
    priority: 1,
    startDate: "string",
    deadline: "string",
  };

  const action = updateTaskAC({
    taskId: "1",
    todoListId: todoListId2,
    model,
  });
  
  const endState = tasksReducer(startState, action);
  expect(endState[todoListId2].length).toBe(endState[todoListId2].length);

  expect(
    endState[todoListId2].length === startState[todoListId2].length
  ).toBeTruthy();
  expect(endState[todoListId2][0].status).toBe(TaskStatuses.Completed);
  expect(startState[todoListId2][0].status).toBe(TaskStatuses.New);
});

test("new array should be added when new todolist is added", () => {
  const newTodoList = {
    id: "sdfs",
    title: "New todolist",
    addedDate: "",
    order: 17,
  };
  const action = addTodolistAC({ todoList: newTodoList });

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
  const action = removeTodolistAC({ todoListId: todoListId2 });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todoListId2]).not.toBeDefined();
});

test("empty arrays should be added when we set todolists", () => {
  const todoList = [
    { id: "1", title: "title1", order: 0, addedDate: "" },
    { id: "2", title: "title2", order: 0, addedDate: "" },
  ];
  const action = setTodoListsAC({todoLists: todoList });

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);
  expect(keys.length).toBe(2);
  expect(endState["1"]).toBeDefined();
  expect(endState["2"]).toBeDefined();
});

test("tasks should be added to TodoList", () => {
  const action = fetchTasks.fulfilled({todoListId: todoListId1, tasks: startState[todoListId1]}, "requestId", "todoListId");

  const endState = tasksReducer(
    {
      [todoListId1]: [],
      [todoListId2]: [],
    },
    action
  );

  expect(endState[todoListId1].length).toBe(3);
  expect(endState[todoListId2].length).toBe(0);
});

test("task entity status should be changed", () => {
  const action = setTaskLoadingStatusAC({taskId: "1", todoListId: todoListId1, taskLoadingStatus: "loading"});

  const endState = tasksReducer(startState, action);

  expect(endState === startState).toBeFalsy();
  expect(
    endState[todoListId1].length === startState[todoListId1].length
  ).toBeTruthy();
  expect(
    startState[todoListId1][0].entityTaskStatus ===
      endState[todoListId1][0].entityTaskStatus
  ).toBeFalsy();
  expect(endState[todoListId1][0].entityTaskStatus).toBe("loading");
});
