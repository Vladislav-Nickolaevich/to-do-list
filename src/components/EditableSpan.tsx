import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    updateTask: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const changeTextOfTask = () => {
        setEdit(!edit)
        props.updateTask(newTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
        edit ?
            <input value={newTitle}  onBlur={changeTextOfTask} onChange={onChangeHandler} autoFocus/> :
            <span onClick={changeTextOfTask}>{props.title}</span>

    );
};

