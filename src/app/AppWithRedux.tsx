import React, {useCallback, useEffect} from 'react';
import '../App.css';
import {AddItemForm} from "../components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import LinearProgress from "@mui/material/LinearProgress"
import {
    changeFilterAC,
    createTodolistTC, deleteTodolistTC, FilterValuesType,
    setTodolistsTC, TodolistDomainType, updateTodolistTitleTC
} from "../state/todolist-reducer";
import {
    createTaskTC, removeTaskTC, TasksStateType, updateTaskStatusTC, updateTaskTitleTC,
} from "../state/task-reducer";
import {useAppDispatch, useAppSelector} from "../state/store";
import {TodoList} from "../TodoList";
import {TaskStatuses} from "../api/task-api";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";



function AppWithRedux() {
    const dispatch = useAppDispatch()

    const todolist = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const error = useAppSelector<null | string>(state => state.app.error)

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

    const addTodolistHandler = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTitleTC(todolistId, taskId, title))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistTitleTC(todolistId, title))
    }, [dispatch])


    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    return (
        <div className="App">
            {error && <ErrorSnackbar/>}
            <AppBar style={{height: '60px'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' &&
                <div style={{marginTop: '30px', width: '100%', position: 'fixed'}}>
                    <LinearProgress color={"secondary"}/>
                </div>}
            <Container fixed>
                <Grid container sx={{p: '50px 0'}}>
                    <AddItemForm addTask={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={6}>
                    {
                        todolist.map(todo => {
                            return (
                                <Grid item key={todo.id}>
                                    <Paper sx={{padding: '20px'}} elevation={16}>
                                        <TodoList
                                            key={todo.id}
                                            entityStatus={todo.entityStatus}
                                            todolistId={todo.id}
                                            title={todo.title}
                                            tasks={tasks[todo.id]}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={todo.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
