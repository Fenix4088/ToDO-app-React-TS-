import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed';


function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true}
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(taskId: string) {
        const newTasks = tasks.filter(task => task.id !== taskId);
        setTasks(newTasks);
    }

    function changeFilter(filterVal: FilterValuesType) {
        setFilter(filterVal);
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };

        setTasks([newTask, ...tasks]);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }
    }

    let tasksForTodoList = tasks;
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(task => task.isDone === false);
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(task => task.isDone === true);
    }

    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={'What to learn?'}
                tasks={tasksForTodoList}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;

