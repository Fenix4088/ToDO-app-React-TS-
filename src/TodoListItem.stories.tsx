import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { TodoListItem, TodoListItemType } from "./TodoListItem";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";
import { Story } from "@storybook/react/types-6-0";
import { Button, ButtonProps } from "./stories/Button";

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
          title: "test task",
          isDone: true,
        }}
      />
      <TodoListItem
        todoListId={"todoListId1"}
        task={{
          id: "1",
          title: "test task",
          isDone: false,
        }}
      />
    </>
  );
};

const Template: Story<TodoListItemType> = (args) => {
    return <>
        <TodoListItem {...args} task={{id: "3", title: "Hello", isDone: true}}/>
        <TodoListItem {...args} task={{id: "3", title: "Bue", isDone: false}}/>
    </>
}


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


const Template2: Story<TodoListItemType> = (args) => <TodoListItem {...args} />

export const Separate1 = Template2.bind({});
Separate1.args = {
    todoListId: "todoListId1",
      task: {
        id: "3",
        title: "New storybook syntax",
        isDone: true,
      },
};

export const Separate2 = Template2.bind({});
Separate2.args = {
    todoListId: "todoListId1",
        task: {
            id: "3",
            title: "New storybook syntax",
            isDone: false,
        },
};