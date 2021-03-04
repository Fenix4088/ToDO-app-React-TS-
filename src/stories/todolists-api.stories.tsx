import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { todolistsAPI } from "../api/todolists-api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistsAPI.getTodolists().then((resp) => setState(resp.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todoListTitle, setTodoListTitle] = useState<string>("");
  /*  useEffect(() => {
              todolistsAPI.createTodolist("Yehor todolist").then((res) => setState(res.data));
            }, []);*/

  const onCreateTodoList = (): void => {
    todolistsAPI
      .createTodolist(todoListTitle)
      .then((res) => setState(res.data));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    setTodoListTitle(value);
  };

  return (
    <>
      <input
        type="text"
        value={todoListTitle}
        placeholder={"Enter TodoList name..."}
        onChange={onInputChange}
      />
      <button onClick={onCreateTodoList}>Create new todolist</button>
      <div> {JSON.stringify(state)}</div>
    </>
  );
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todoListId, setTodoListId] = useState<string>("");
  /*  useEffect(() => {
              todolistsAPI.deleteTodolist("993008cc-0b2f-4ff9-887e-877ec9e767c8").then((res) => setState(res.data));
            }, []);*/

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    setTodoListId(value);
  };
  const onDeleteTodoList = (): void => {
    todolistsAPI.deleteTodolist(todoListId).then((res) => setState(res.data));
    setTodoListId("");
  };

  return (
    <>
      <input
        type="text"
        value={todoListId}
        placeholder={"Enter TodoList ID..."}
        onChange={onInputChange}
      />
      <button onClick={onDeleteTodoList}>Delete new todolist</button>
      <div> {JSON.stringify(state)}</div>
    </>
  );
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [newTodoListTitle, setNewTodoListTitle] = useState<string>("");
  const [todoListId, setTodoListId] = useState<string>("");
  /*  useEffect(() => {
              todolistsAPI.updateTodolist("993008cc-0b2f-4ff9-887e-877ec9e767c8", "Fuck you").then((res) => setState(res.data));
            }, []);*/

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { input } = e.currentTarget.dataset;
    const { value } = e.currentTarget;
    input === "todoId" ? setTodoListId(value) : setNewTodoListTitle(value);
  };

  const onUpdateTodoList = (): void => {
    todolistsAPI
      .updateTodolist(todoListId, newTodoListTitle)
      .then((res) => setState(res.data));
    setTodoListId("");
    setNewTodoListTitle("");
  };

  return (
    <>
      <input
        data-input={"todoTitle"}
        type="text"
        value={newTodoListTitle}
        placeholder={"Enter Existed todo list new title..."}
        onChange={onInputChange}
      />
      <input
        data-input={"todoId"}
        type="text"
        value={todoListId}
        placeholder={"Enter TodoList ID..."}
        onChange={onInputChange}
      />
      <button onClick={onUpdateTodoList}>Update todolist</button>
      <div> {JSON.stringify(state)}</div>
    </>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todoListId, setTodoListId] = useState<any>("");
  /*  useEffect(() => {
            todolistsAPI.getTasks(todolistId).then((resp) => setState(resp.data));
          }, []);*/

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    setTodoListId(value);
  };

  const onGetTasks = (): void => {
    todolistsAPI.getTasks(todoListId).then((resp) => setState(resp.data));
    setTodoListId("");
  };

  return (
    <>
      <input
        type="text"
        value={todoListId}
        placeholder={"Enter TodoList ID..."}
        onChange={onInputChange}
      />
      <button onClick={onGetTasks}>Get tasks of current todo list</button>
      <div> {JSON.stringify(state)}</div>
    </>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todoListId, setTodoListId] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { input } = e.currentTarget.dataset;
    const { value } = e.currentTarget;
    input === "todoId" ? setTodoListId(value) : setTaskTitle(value);
  };

  const onCreateTask = (): void => {
    todolistsAPI.createTask(todoListId, taskTitle).then((resp) => setState(resp.data));
    setTodoListId("");
      setTaskTitle("")
  };

  return (
    <>
      <input
        data-input={"todoId"}
        type="text"
        value={todoListId}
        placeholder={"Enter TodoList ID..."}
        onChange={onInputChange}
      />
      <input
        data-input={"taskTitle"}
        type="text"
        value={taskTitle}
        placeholder={"Enter task name..."}
        onChange={onInputChange}
      />
      <button onClick={onCreateTask}>Create task</button>
      <div> {JSON.stringify(state)}</div>
    </>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
    const [todoListId, setTodoListId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
/*  useEffect(() => {
    const todolistId = "d0f69b77-67f3-4481-ad56-589d628f5436";
    const taskId = "d0f69b77-67f3-4481-ad56-589d628f5436";
    todolistsAPI
      .deleteTask(todolistId, taskId)
      .then((resp) => setState(resp.data));
  }, []);*/


    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { input } = e.currentTarget.dataset;
        const { value } = e.currentTarget;
        input === "todoId" ? setTodoListId(value) : setTaskId(value);
    };

    const onCreateTask = (): void => {
        todolistsAPI.deleteTask(todoListId, taskId).then((resp) => setState(resp.data));
        setTodoListId("");
        setTaskId("")
    };

    return (
        <>
            <input
                data-input={"todoId"}
                type="text"
                value={todoListId}
                placeholder={"Enter TodoList ID..."}
                onChange={onInputChange}
            />
            <input
                data-input={"taskId"}
                type="text"
                value={taskId}
                placeholder={"Enter task ID..."}
                onChange={onInputChange}
            />
            <button onClick={onCreateTask}>Create task</button>
            <div> {JSON.stringify(state)}</div>
        </>
    );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
    const [todoListId, setTodoListId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
    const [taskTitle, setTaskTitle] = useState<string>("");

    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { input } = e.currentTarget.dataset;
        const { value } = e.currentTarget;
        switch(input) {
            case "todoId":
                setTodoListId(value);
                break;
            case "taskId":
                setTaskId(value);
                break
            case "taskTitle":
                setTaskTitle(value);
                break;
        }
    };

    const onCreateTask = (): void => {
        todolistsAPI.updateTask(todoListId, taskId, taskTitle).then((resp) => setState(resp.data));
        setTodoListId("");
        setTaskId("");
        setTaskTitle("");
    };

    return (
        <>
            <input
                data-input={"todoId"}
                type="text"
                value={todoListId}
                placeholder={"Enter TodoList ID..."}
                onChange={onInputChange}
            />
            <input
                data-input={"taskId"}
                type="text"
                value={taskId}
                placeholder={"Enter task ID..."}
                onChange={onInputChange}
            />

            <input
                data-input={"taskTitle"}
                type="text"
                value={taskTitle}
                placeholder={"Enter task Title..."}
                onChange={onInputChange}
            />
            <button onClick={onCreateTask}>Update task</button>
            <div> {JSON.stringify(state)}</div>
        </>
    );
};
