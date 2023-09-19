import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {TaskStatuses} from "../api/task-api";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    changeFilterAC,
    createTodolistTC,
    deleteTodolistTC,
    FilterValuesType, setTodolistsTC,
    TodolistDomainType, updateTodolistTitleTC
} from "./todolist-reducer";
import {useAppDispatch, useAppSelector} from "../app/store";
import {
    createTaskTC,
    removeTaskTC,
    TasksStateType,
    updateTaskStatusTC,
    updateTaskTitleTC
} from "./task-reducer";
import {Todolist} from "./TodolistsList/Todolist/Todolist";
import {Navigate} from "react-router-dom";


export const TodolistsList: React.FC = () => {
    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!isLoggedIn) return
        dispatch(setTodolistsTC())
    }, [])


    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, nextFilterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, nextFilterValue))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, id: string, status: TaskStatuses) => {
        dispatch(updateTaskStatusTC(todolistId, id, status))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTitleTC(todolistId, taskId, title))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistTitleTC(todolistId, title))
    }, [dispatch])
    if(!isLoggedIn){
        return <Navigate to={"/login"}/>
    }
    return (
        <div>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    );
}

