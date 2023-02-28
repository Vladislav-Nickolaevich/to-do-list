import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

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
            <TextField
                value={newTitle}
                onBlur={changeTextOfTask}
                autoFocus
                onChange={onChangeHandler}
                variant='standard'
            />
            :
            <span onClick={changeTextOfTask}>{props.title}</span>

    );
};

