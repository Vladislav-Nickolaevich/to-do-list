import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Input} from "./components/Input";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoList} from "./TodoList";

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

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolist, setTodolist] = useState<TodolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "TS", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Auto", isDone: false},
            {id: v1(), title: "Scissors", isDone: true},
            {id: v1(), title: "Mobile Phone", isDone: false},

        ],
    })

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }

    const changeFilter = (todolistId: string, nextFilterValue: FilterValuesType) => {
        setTodolist(todolist.map(el => el.id === todolistId ? {...el, filter: nextFilterValue} : el))
    }


    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, id: string, value: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone: value} : el)})
    }
    const onClickDeleteTodolist = (todolistId: string) => {
        setTodolist(todolist.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolistHandler = (title: string) => {
        let newId = v1()
        const newTodo: TodolistsType = {id: newId, title, filter: 'all'}
        setTodolist([newTodo, ...todolist])
        setTasks({[newId]: [], ...tasks})
    }
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title} : el)})
    }
    const updateTitle = (todolistId: string, title: string) => {
        setTodolist(todolist.map(el => el.id === todolistId ? {...el, title} : el))
    }
    return (
        <div className="App">
            <AppBar  style={{height: '60px'}}>
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
                                            onClickDeleteTodolist={onClickDeleteTodolist}
                                            updateTask={updateTask}
                                            updateTitle={updateTitle}
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

export default App;
