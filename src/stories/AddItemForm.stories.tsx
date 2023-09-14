import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {AddItemForm, AddItemFormType} from '../components/AddItemForm/AddItemForm';
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      description: 'Button clicked inside form',
    }
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
  args: {
    addItem: action('Button clicked inside form')
  }
};
export const AddItemFormWithErrorStory = (args: AddItemFormType) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>('Title is required')
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
      args.addItem(value)
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
        />
        <IconButton
            color='primary'
            onClick={onClickAdd}>
          <AddIcon/>
        </IconButton>
        {error && <div
            style={{color: 'red'}}
        >{error}</div>}
      </div>
  )
};




