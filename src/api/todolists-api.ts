import axios from "axios";

export type TodolistT = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

type ResponseT<D> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

export type TaskT = {
  description: string;
  title: string;
  completed: boolean;
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
  deleteTodolist(userId: string) {
    return instance.delete<ResponseT<{}>>(`todo-lists/${userId}`);
  },
  updateTodolist(userId: string, title: string) {
    return instance.put<ResponseT<{}>>(`todo-lists/${userId}`, {
      title,
    });
  },

  getTasks(todoListId: string) {
    return axios.get<GetTasksResponse>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks`,
      settings
    );
  },
};
