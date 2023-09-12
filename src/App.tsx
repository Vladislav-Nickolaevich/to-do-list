import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoList} from "./TodoList";
import {TasksStateType} from "./state/task-reducer";
import {FilterValuesType, TodolistDomainType} from "./state/todolist-reducer";
import {TaskPriorities, TaskStatuses} from "./api/task-api";

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolist, setTodolist] = useState<TodolistDomainType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus:'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 1, addedDate: '', entityStatus: 'idle'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {
                id: v1(), title: "HTML & CSS", status: TaskStatuses.Completed, todoListId: todolistID1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistID1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {
                id: v1(), title: "React", status: TaskStatuses.New, todoListId: todolistID1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            }
        ],
        [todolistID2]: [
            {
                id: v1(), title: "Auto", status: TaskStatuses.New, todoListId: todolistID2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {
                id: v1(), title: "Mobile Phone", status: TaskStatuses.Completed, todoListId: todolistID2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
        ],
    })

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }

    const changeFilter = (todolistId: string, nextFilterValue: FilterValuesType) => {
        setTodolist(todolist.map(el => el.id === todolistId ? {...el, filter: nextFilterValue} : el))
    }

    const addTask = (todolistId: string, title: string) => {
        let newTask = {
            id: v1(), title, status: TaskStatuses.New, todoListId: todolistId, startDate: '',
            deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, id: string, status: TaskStatuses) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, status} : el)})
    }
    const removeTodolist = (todolistId: string) => {
        setTodolist(todolist.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolistHandler = (title: string) => {
        let newId = v1()
        const newTodo: TodolistDomainType = {id: newId, title, filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'}
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
                    <AddItemForm addTask={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={6}>
                    {
                        todolist.map(todo => {
                            let tasksForRender = tasks[todo.id];
                            if (todo.filter === 'active') {
                                tasksForRender = tasks[todo.id].filter(task => task.status === TaskStatuses.New)
                            } else if (todo.filter === 'completed') {
                                tasksForRender = tasks[todo.id].filter(task => task.status === TaskStatuses.Completed)
                            }
                            return (
                                <Grid item key={todo.id}>
                                    <Paper sx={{padding: '20px'}} elevation={16}>
                                        <TodoList
                                            key={todo.id}
                                            entityStatus={todo.entityStatus}
                                            todolistId={todo.id}
                                            title={todo.title}
                                            tasks={tasksForRender}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={todo.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={updateTask}
                                            changeTodolistTitle={updateTitle}
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
