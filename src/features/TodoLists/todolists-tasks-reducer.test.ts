import {addTodolistAC, TodolistDomainT, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TaskStateT} from "./tasks-reducer";

test('ids should be equals', () => {
  const startTasksState: TaskStateT = {};
  const startTodolistsState: Array<TodolistDomainT> = [];

  const newTodoList = {
    id: "12",
    title: "New todolist",
    addedDate: "string",
    order: 2,
  };
  const action = addTodolistAC({todoList: newTodoList});

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todoList.id);
  expect(idFromTodolists).toBe(action.payload.todoList.id);
});
