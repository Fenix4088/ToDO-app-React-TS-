import axios from "axios";

export type TodolistT = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

type ResponseT<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

export type TaskT = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: Array<TaskT>;
};

export type UpdateTaskT = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "98ca0a48-2755-4c64-8a17-87fb70df4a7a",
  },
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

export const todolistsAPI = {

  getTodolists() {
    return instance.get<Array<TodolistT>>("todo-lists");
  },

  createTodolist(title: string) {
    return instance.post<ResponseT<{ item: TodolistT }>>("todo-lists", {
      title,
    });
  },

  deleteTodolist(todoListId: string) {
    return instance.delete<ResponseT>(`todo-lists/${todoListId}`);
  },

  updateTodolist(todoListId: string, title: string) {
    return instance.put<ResponseT>(`todo-lists/${todoListId}`, {
      title,
    });
  },

  getTasks(todoListId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`);
  },

  createTask(todolistId: string, taskTitle: string) {
    return instance
      .post<GetTasksResponse>(`todo-lists/${todolistId}/tasks`, {title: taskTitle});
  },

  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<ResponseT>(
      `todo-lists/${todoListId}/tasks/${taskId}`
    );
  },

  updateTask(todoListId: string, taskId: string, title: string) {
      return instance.put<ResponseT<TaskT>>(`todo-lists/${todoListId}/tasks/${taskId}`, {
        title,
        description: "desc",
        completed: false,
        status: 1,
        priority: 1,
        startDate: "",
        deadline: "",
      })
  }
};
