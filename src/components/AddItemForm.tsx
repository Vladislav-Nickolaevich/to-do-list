import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export type AddItemFormType = {
    addTask: (title: string) => void
    disabled?: boolean
}
export const AddItemForm = memo((props: AddItemFormType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAdd()
        }
    }
    const onClickAdd = () => {
        if (value.trim() !== '') {
            props.addTask(value)
            setValue('')
            setError(null)
        } else {
            setValue('')
            setError('Title is required')
        }
    }
    return (
        <div>
            <TextField variant="outlined"
                       error={!!error}
                       size='small'
                       label="Title"
                       value={value}
                       onChange={inputOnChangeHandler}
                       onKeyDown={onKeyDownInput}
                       disabled={props.disabled}
                       helperText={error}
            />
            <IconButton
                color='primary'
                onClick={onClickAdd}
                disabled={props.disabled}
            >
                <AddIcon/>
            </IconButton>
            {error && <div style={{color: 'red'}}>
                {error}
            </div>}
        </div>
    );
});

