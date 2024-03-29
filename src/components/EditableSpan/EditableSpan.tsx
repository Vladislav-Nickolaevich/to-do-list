import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
}
export const EditableSpan = memo((props: EditableSpanType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const changeTextOfTask = () => {
        setEdit(!edit)
        props.changeTitle(newTitle)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>  setNewTitle(e.currentTarget.value)

    return (
        edit ?
            <TextField
                value={newTitle}
                onBlur={changeTextOfTask}
                autoFocus
                onChange={onChangeTitle}
                variant='standard'
            />
            :
            <span onClick={changeTextOfTask}>{props.title}</span>
    );
})

