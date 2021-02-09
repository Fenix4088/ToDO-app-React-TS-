import React, { useReducer, useState } from "react";
// import "./App.css";
// import { TodoList } from "./TodoList";
// import { v1 } from "uuid";
// import { AddItemForm } from "./AddItemFrom";
// import {
//   AppBar,
//   Button,
//   IconButton,
//   Typography,
//   Toolbar,
//   Container,
//   Grid,
//   Paper,
//   Box,
// } from "@material-ui/core";
// import { Menu } from "@material-ui/icons";
// import {
//   addTodolistAC,
//   changeTodolistFilterAC,
//   changeTodolistTitleAC,
//   removeTodolistAC,
//   todolistsReducer
// } from "./state/todolists-reducer";
// import {
//   addTaskAC,
//   changeTaskStatusAC,
//   changeTaskTitleAC,
//   removeTaskAC,
//   tasksReducer,
// } from "./state/tasks-reducer";
//
// export type TaskType = {
//   id: string;
//   title: string;
//   isDone: boolean;
// };
// export type FilterValuesType = "all" | "active" | "completed";
// export type TodoListType = {
//   id: string;
//   title: string;
//   filter: FilterValuesType;
// };
// export type TaskStateTyp = {
//   [key: string]: Array<TaskType>;
// };
//
// function AppWithReducers() {
//   const todoListID1 = v1();
//   const todoListID2 = v1();
//
//   const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
//     { id: todoListID1, title: "What to learn?", filter: "all" },
//     { id: todoListID2, title: "What to bue?", filter: "all" },
//   ]);
//   const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//     [todoListID1]: [
//       { id: v1(), title: "HTML", isDone: true },
//       { id: v1(), title: "CSS", isDone: false },
//       { id: v1(), title: "JS", isDone: false },
//       { id: v1(), title: "React", isDone: true },
//     ],
//     [todoListID2]: [
//       { id: v1(), title: "book", isDone: true },
//       { id: v1(), title: "bread", isDone: false },
//       { id: v1(), title: "milk", isDone: true },
//     ],
//   });
//
//   function removeTask(taskId: string, todoListID: string) {
//     dispatchToTasks(removeTaskAC(taskId, todoListID));
//   }
//
//   function changeFilter(filterVal: FilterValuesType, todoListID: string) {
//     dispatchToTodoLists(changeTodolistFilterAC(filterVal, todoListID));
//   }
//
//   function addTask(title: string, todoListID: string) {
//     dispatchToTasks(addTaskAC(title, todoListID));
//   }
//
//   function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
//     dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListID));
//   }
//
//   function removeTodoList(todoListId: string): void {
//     const action = removeTodolistAC(todoListId);
//     dispatchToTodoLists(action);
//     dispatchToTasks(action);
//   }
//
//   function filterTasksForTodoList(
//     todoFilterValue: FilterValuesType,
//     todoListId: string
//   ) {
//     let tasksForTodoList = tasks[todoListId];
//     if (todoFilterValue === "active") {
//       tasksForTodoList = tasks[todoListId].filter((task) => !task.isDone);
//     }
//     if (todoFilterValue === "completed") {
//       tasksForTodoList = tasks[todoListId].filter((task) => task.isDone);
//     }
//
//     return tasksForTodoList;
//   }
//
//   function addTodoList(todoListTitle: string): void {
//     const action = addTodolistAC(todoListTitle);
//     dispatchToTodoLists(action);
//     dispatchToTasks(action);
//   }
//
//   function changeTaskTitle(
//     taskId: string,
//     newTitle: string,
//     todoListID: string
//   ) {
//     dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todoListID));
//   }
//
//   function changeTodoListTitle(newTitle: string, todoListID: string): void {
//     dispatchToTodoLists(changeTodolistTitleAC(newTitle, todoListID));
//   }
//
//   return (
//     <div className="App">
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="menu">
//             <Menu />
//           </IconButton>
//           <Typography variant="h6">News</Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//
//       <Container>
//         <Grid
//           container
//           style={{ padding: "10px" }}
//           justify="center"
//           alignItems="center"
//         >
//           <AddItemForm
//             addItem={addTodoList}
//             placeholder={"Enter Todo List name..."}
//           />
//         </Grid>
//
//         <Grid container spacing={3}>
//           {todoLists.map((todoList) => {
//             const tasksForTodoList = filterTasksForTodoList(
//               todoList.filter,
//               todoList.id
//             );
//
//             return (
//               <Grid item spacing={3}>
//                 <Paper elevation={5} style={{ padding: "20px 10px" }}>
//                   <TodoList
//                     key={todoList.id}
//                     id={todoList.id}
//                     filter={todoList.filter}
//                     title={todoList.title}
//                     tasks={tasksForTodoList}
//                     addTask={addTask}
//                     removeTask={removeTask}
//                     changeFilter={changeFilter}
//                     changeStatus={changeStatus}
//                     removeTodoList={removeTodoList}
//                     changeTaskTitle={changeTaskTitle}
//                     changeTodoListTitle={changeTodoListTitle}
//                   />
//                 </Paper>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </Container>
//     </div>
//   );
// }
//
// export default AppWithReducers;
