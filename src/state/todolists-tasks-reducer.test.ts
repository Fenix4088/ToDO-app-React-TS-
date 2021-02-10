import {addTodolistAC, todolistsReducer, TodoListT} from "./todolists-reducer";
import {tasksReducer, TaskStateT} from "./tasks-reducer";

test('ids should be equals', () => {
  const startTasksState: TaskStateT = {};
  const startTodolistsState: Array<TodoListT> = [];

  const action = addTodolistAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
