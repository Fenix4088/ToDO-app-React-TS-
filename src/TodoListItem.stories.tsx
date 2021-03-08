import React from "react";
import { TodoListItem, TodoListItemType } from "./TodoListItem";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";
import { Story } from "@storybook/react/types-6-0";
import { TaskPriorities, TaskStatuses } from "./api/todolists-api";

export default {
  title: "TodoListItem Component",
  component: TodoListItem,
  decorators: [ReduxStoreProviderDecorator],
};

export const TodoListItemBaseExample = () => {
  return (
    <>
      <TodoListItem
        todoListId={"todoListId1"}
        task={{
          id: "1",
          title: "New storybook syntax",
          status: TaskStatuses.Completed,
          description: "",
          priority: TaskPriorities.Low,
          startDate: "",
          deadline: "",
          order: 1,
          addedDate: "",
          todoListId: "todolistId2",
        }}
      />
      <TodoListItem
        todoListId={"todoListId1"}
        task={{
          id: "2",

          title: "New storybook syntax",
          status: TaskStatuses.Completed,
          description: "",
          priority: TaskPriorities.Low,
          startDate: "",
          deadline: "",
          order: 1,
          addedDate: "",
          todoListId: "todolistId2",
        }}
      />
    </>
  );
};

const Template: Story<TodoListItemType> = (args) => {
  return (
    <>
      <TodoListItem
        {...args}
        task={{
          id: "3",
          title: "New storybook syntax",
          status: TaskStatuses.New,
          description: "",
          priority: TaskPriorities.Low,
          startDate: "",
          deadline: "",
          order: 1,
          addedDate: "",
          todoListId: "todolistId2",
        }}
      />
      <TodoListItem
        {...args}
        task={{
          id: "4",

          title: "New storybook syntax",
          status: TaskStatuses.Completed,
          description: "",
          priority: TaskPriorities.Low,
          startDate: "",
          deadline: "",
          order: 1,
          addedDate: "",
          todoListId: "todolistId2",
        }}
      />
    </>
  );
};

export const Together1 = Template.bind({});
Together1.args = {
  todoListId: "todoListId1",
  /*  task: {
        id: "3",
        title: "New storybook syntax",
        isDone: true,
      },*/
};

export const Together2 = Template.bind({});
Together2.args = {
  todoListId: "todoListId1",
  /*    task: {
            id: "3",
            title: "New storybook syntax",
            isDone: false,
        },*/
};

const Template2: Story<TodoListItemType> = (args) => <TodoListItem {...args} />;

export const Separate1 = Template2.bind({});
Separate1.args = {
  todoListId: "todoListId1",
  task: {
    id: "3",
    title: "New storybook syntax",
    status: TaskStatuses.New,
    description: "",
    priority: TaskPriorities.Low,
    startDate: "",
    deadline: "",
    order: 1,
    addedDate: "",
    todoListId: "todolistId2",
  },
};

export const Separate2 = Template2.bind({});
Separate2.args = {
  todoListId: "todoListId1",
  task: {
    id: "3",
    title: "New storybook syntax",
    status: TaskStatuses.Completed,
    description: "",
    priority: TaskPriorities.Low,
    startDate: "",
    deadline: "",
    order: 1,
    addedDate: "",
    todoListId: "todolistId2",
  },
};
