import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsTC, TodolistDomainType
} from "./state/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, TasksStateType,
} from "./state/task-reducer";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./state/store";
import {TodoList} from "./TodoList";
import {TaskStatuses} from "./api/task-api";



function AppWithRedux() {
    const dispatch = useAppDispatch()

    const todolist = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    },[dispatch])

    const changeFilter = useCallback((todolistId: string, nextFilterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, nextFilterValue))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, id: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(id, status, todolistId))
    },[dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const addTodolistHandler = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch])



    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    return (
        <div className="App">
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
