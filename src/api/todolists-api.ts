import axios, {AxiosResponse} from "axios";

// * types
export type TodolistT = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type ResponseT<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Later = 3,
}

export type TaskT = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};

export type GetTasksResponse = {
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

// * API
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

export const todoListsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistT>>("todo-lists");
  },

  createTodoList(title: string) {
    return instance.post<ResponseT<{ item: TodolistT }>>("todo-lists", {
      title,
    });
  },

  deleteTodoList(todoListId: string) {
    return instance.delete<ResponseT>(`todo-lists/${todoListId}`);
  },

  updateTodolist(todoListId: string, title: string) {
    return instance.put<ResponseT>(`todo-lists/${todoListId}`, {
      title,
    });
  },

  getTasks(todoListId: string):Promise<AxiosResponse<GetTasksResponse>> {
    return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`);
  },

  createTask(todolistId: string, taskTitle: string) {
    return instance.post<ResponseT<{ item: TaskT }>>(
      `todo-lists/${todolistId}/tasks`,
      {
        title: taskTitle,
      }
    );
  },

  deleteTask(taskId: string, todoListId: string) {
    return instance.delete<ResponseT>(
      `todo-lists/${todoListId}/tasks/${taskId}`
    );
  },

  updateTask(taskId: string, todoListId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseT<TaskT>>(
      `todo-lists/${todoListId}/tasks/${taskId}`,
      model
    );
  },
};

export type LoginParamsT = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
export const authAPI = {
  login(data: LoginParamsT) {
    return instance.post<ResponseT<{ userId?: number }>>("auth/login", data);
  },
  logout() {
    return instance.delete<ResponseT<{ userId?: number }>>("auth/login");
  },
  me() {
    return instance.get<
      ResponseT<{ id: number; email: string; login: string }>
    >("auth/me");
  },
};
