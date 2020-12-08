import React from 'react';
import './App.css';
import { TodoList } from './TodoList';

export type TaskType = {
  id: number,
  title: string,
  isDone: boolean
}

function App() {

  const tasksOne: Array<TaskType> = [
    {id: 1, title: "TaskOne", isDone: true},
    {id: 2, title: "TaskTwo", isDone: false},
    {id: 3, title: "TaskThree", isDone: true},
  ];

  const tasksTwo: Array<TaskType> = [
    {id: 4, title: "TaskOne", isDone: true},
    {id: 5, title: "TaskTwo", isDone: false},
    {id: 6, title: "TaskThree", isDone: true},
  ];

  const tasksThree: Array<TaskType> = [
    {id: 7, title: "TaskOne", isDone: false},
    {id: 8, title: "TaskTwo", isDone: false},
    {id: 9, title: "TaskThree", isDone: true},
  ];

  return (
    <div className="App">
      <TodoList title={"What to learn?"} tasks={tasksOne}/>
      <TodoList title={"What to buy?"} tasks={tasksTwo}/>
      <TodoList title={"What to read?"} tasks={tasksThree}/>
    </div>
  );
}

export default App;

