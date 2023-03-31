import React from 'react';
import './App.css';
import {Input} from "./components/Input";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoList} from "./TodoList";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistInTodoAC,
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch = useDispatch()

    const todolist = useSelector<AppRootState, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }

    const changeFilter = (todolistId: string, nextFilterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, nextFilterValue))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }
    const changeTaskStatus = (todolistId: string, id: string, value: boolean) => {
        dispatch(changeTaskStatusAC(id, value, todolistId))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistInTodoAC(todolistId))
    }
    const addTodolistHandler = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }
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
                    <Input addTask={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={6}>
                    {
                        todolist.map(todo => {
                            let tasksForRender = tasks[todo.id];
                            if (todo.filter === 'active') {
                                tasksForRender = tasks[todo.id].filter(task => !task.isDone)
                            } else if (todo.filter === 'completed') {
                                tasksForRender = tasks[todo.id].filter(task => task.isDone)
                            }
                            return (
                                <Grid item key={todo.id}>
                                    <Paper sx={{padding: '20px'}} elevation={16}>
                                        <TodoList
                                            key={todo.id}
                                            todolistId={todo.id}
                                            title={todo.title}
                                            tasks={tasksForRender}
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
