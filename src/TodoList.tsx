import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";
import {Checkbox} from "./components/Checkbox";
import {Button, ButtonGroup, IconButton, ListItem, Typography} from "@mui/material";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';


type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, nextFilterValue: FilterValuesType) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, id: string, value: boolean) => void
    filter: FilterValuesType
    onClickDeleteTodolist: (todolistId: string) => void
    updateTask:(todolistId: string, taskId: string, title: string) => void
    updateTitle: (todolistId: string, title: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const {todolistId, filter, changeFilter, changeTaskStatus, tasks, removeTask} = props

    const tasksListsItems = tasks.map((task) => {
        const onClickHandler = () => removeTask(todolistId, task.id)

        const changeStatusHandler = (taskId: string, eventValue: boolean) => {
            changeTaskStatus(props.todolistId, taskId,eventValue)
        }
        const updateTaskHandler = (newTitle: string) => {
            props.updateTask(props.todolistId, task.id, newTitle)
        }
        return (
            <ListItem
                key={task.id}
                className={task.isDone ? "is-done" : ""}
                sx={{p: '0'}}
            >
                <Checkbox callBack={(eventValue:boolean) => changeStatusHandler(task.id, eventValue)} checked={task.isDone}/>
                <EditableSpan title={task.title} updateTask={updateTaskHandler}/>
                <IconButton
                    size='small'
                    onClick={onClickHandler}>
                    <CancelPresentationIcon fontSize='small'/>
                </IconButton>
            </ListItem>
        );
    })

    const allClickHandler = () => changeFilter(todolistId, 'all')
    const activeClickHandler = () => changeFilter(todolistId, 'active')
    const completedClickHandler = () => changeFilter(todolistId, 'completed')
    const onClickDeleteTodolist = () => props.onClickDeleteTodolist(props.todolistId)
    const addTaskHandler = (title:string) => {
        props.addTask(props.todolistId, title)
    }
    const updateTitle = (title: string) => {
        props.updateTitle(props.todolistId, title)
    }
    return (
        <div>
            <span>
                <Typography variant='h6' align='center'>
                <EditableSpan title={props.title} updateTask={updateTitle}/>
                    <IconButton onClick={onClickDeleteTodolist}>
                        <CancelPresentationIcon/>
                    </IconButton>
                </Typography>
            </span>

            <Input addTask={addTaskHandler}/>
            <ul>
                {tasksListsItems}
            </ul>
            <div>

                <ButtonGroup
                    disableElevation
                    size='small'
                    variant="contained"
                    fullWidth>
                    <Button
                        sx={{mr: '3px', fontSize: '10px'}}
                        color={filter === 'all' ? "secondary" : "primary"}
                        onClick={allClickHandler}>All
                    </Button>
                    <Button
                        sx={{mr: '3px', fontSize: '10px'}}
                        color={filter === 'active' ? "secondary" : "primary"}
                        onClick={activeClickHandler}>Active
                    </Button>
                    <Button
                        sx={{fontSize: '10px'}}
                        color={filter === 'completed' ? "secondary" : "primary"}
                        onClick={completedClickHandler}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};
