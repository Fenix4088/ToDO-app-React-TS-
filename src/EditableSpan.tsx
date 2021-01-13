import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  changeTitle: (newTitle: string) => void
};

export const EditableSpan = (props: EditableSpanPropsType) => {

  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.title)

  const onEditMode = (): void => setEditMode(true);
  const offEditMode = (): void => {
    setEditMode(false);
    if(title.trim()) props.changeTitle(title.trim());
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>):void => setTitle(e.currentTarget.value)

  return (
      editMode
          ? <input value={title} onBlur={offEditMode} onChange={changeTitle} autoFocus/>
          : <span onDoubleClick={onEditMode}>{props.title}</span>
  );
};