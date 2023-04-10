import React, {memo, useCallback} from 'react';
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
    removeTodolist: (todolistId: string) => void
    changeTaskTitle:(todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodoList = memo((props: TodoListPropsType) => {
    console.log('todo')
    const {todolistId, filter, changeFilter, changeTaskStatus, removeTask} = props

    let tasks = props.tasks;
    if (props.filter === 'active') {
        tasks = tasks.filter(task => !task.isDone)
    } else if (props.filter === 'completed') {
        tasks = tasks.filter(task => task.isDone)
    }

    const tasksListsItems = tasks.map((task) => {
        const onClickHandler = () => removeTask(todolistId, task.id)

        const changeStatusHandler = (taskId: string, eventValue: boolean) => {
            changeTaskStatus(props.todolistId, taskId,eventValue)
        }
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(props.todolistId, task.id, newTitle)
        }
        return (
            <ListItem
                key={task.id}
                className={task.isDone ? "is-done" : ""}
                sx={{p: '0'}}
            >
                <Checkbox callBack={(eventValue:boolean) => changeStatusHandler(task.id, eventValue)} checked={task.isDone}/>
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
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
    const onClickDeleteTodolist = () => props.removeTodolist(props.todolistId)

    const addTaskHandler = useCallback((title:string) => {
        props.addTask(props.todolistId, title)
    }, [props.addTask, props.todolistId])

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }

    return (
        <div>
            <span>
                <Typography variant='h6' align='center'>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
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
})
