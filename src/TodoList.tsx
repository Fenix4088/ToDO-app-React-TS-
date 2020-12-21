import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType, TaskType } from './App';

type TodoListType = {
  title: string,
  tasks: Array<TaskType>
  addTask: (title: string) => void
  removeTask: (taskId: string) => void
  changeFilter: (filterVal: FilterValuesType) => void
}

export function TodoList(props: TodoListType) {

  const [title, setTitle] = useState<string>('');

  const addTask = () => {
    props.addTask(title);
    setTitle('');
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTask();
  };
  const onAllClickHandler = () => {
    props.changeFilter('all')
  };
  const onActiveClickHandler = () => {
    props.changeFilter('active')
  };
  const onCompletedClickHandler = () => {
    props.changeFilter('completed')
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(task => {
            const removeTask = () => {
              props.removeTask(task.id);
            };
            return (
              <li>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={removeTask}>X
                </button>
              </li>
            );
          })
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}