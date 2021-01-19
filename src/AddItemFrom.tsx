import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button, IconButton, TextField } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";

type AddItemFormType = {
  addItem: (title: string) => void;
};

export const AddItemForm = (props: AddItemFormType) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const addItem = () => {
    const itemTitle = title.trim();
    if (itemTitle) {
      props.addItem(itemTitle);
    } else {
      setError("Title is required!");
    }

    setTitle("");
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addItem();
  };

  return (
    <div>
      <TextField
          variant={"outlined"}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
        label={"Enter task name..."}
      />
      <IconButton onClick={addItem} color={"primary"}>
        <AddBox />
      </IconButton>
      {/*{error && <div className={"error-message"}>{error}</div>}*/}
    </div>
  );
};
