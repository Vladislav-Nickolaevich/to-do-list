import React, {memo, useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {TaskStatuses, TaskType} from "../../../api/task-api";
import {FilterValuesType, TodolistDomainType} from "../../todolist-reducer";
import {useAppDispatch} from "../../../app/store";
import {setTodolistTasksTC} from "../../task-reducer";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";


type TodoListPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, nextFilterValue: FilterValuesType) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = memo((props: TodoListPropsType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTodolistTasksTC(props.todolist.id))
    }, [])

    const deleteTodolist = () => props.removeTodolist(props.todolist.id)

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
    }, [props.addTask, props.todolist.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.changeTodolistTitle, props.todolist.id])


    const allClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'all'), [props.changeFilter, props.todolist.id])

    const activeClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'active'), [props.changeFilter, props.todolist.id])

    const completedClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'completed'), [props.changeFilter, props.todolist.id])


    let tasks = props.tasks;
    if (props.todolist.filter === 'active') {
        tasks = tasks.filter(task => task.status === TaskStatuses.New)
    } else if (props.todolist.filter === 'completed') {
        tasks = tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    const tasksListsItems = tasks.map((task) => {
        return (
            <Task
                key={task.id}
                todolistId={props.todolist.id}
                task={task}
                changeTaskStatus={props.changeTaskStatus}
                removeTask={props.removeTask}
                changeTaskTitle={props.changeTaskTitle}
            />
        );
    })

    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={deleteTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div>
                {tasksListsItems}
            </div>
            <div style={{paddingTop: '10px'}}>
                <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                        onClick={allClickHandler}
                        color={'inherit'}>
                    All
                </Button>
                <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                        onClick={activeClickHandler}
                        color={'primary'}>
                    Active
                </Button>
                <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={completedClickHandler}
                        color={'secondary'}>
                    Completed
                </Button>
            </div>
        </div>
    );
})


