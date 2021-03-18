import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from "react";
import { IconButton, TextField } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";

type AddItemFormType = {
  addItem: (title: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const AddItemForm = React.memo(({ disabled = false, ...props }: AddItemFormType) => {
  const { addItem, placeholder } = props;

  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onAddItem = useCallback(() => {
    const itemTitle = title.trim();
    if (itemTitle) {
      addItem(itemTitle);
    } else {
      setError("Title is required!");
    }

    setTitle("");
  }, [title, addItem]);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (error) setError("");
      setTitle(e.currentTarget.value);
    },
    [error]
  );

  const onKeyPressHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") onAddItem();
    },
    [onAddItem]
  );

  return (
    <div style={{ marginBottom: "20px" }}>
      <TextField
          disabled={disabled}
        variant={"outlined"}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
        label={placeholder ? placeholder : "Enter task name..."}
      />
      <IconButton onClick={onAddItem} color={"primary"} disabled={disabled}>
        <AddBox />
      </IconButton>
    </div>
  );
});
