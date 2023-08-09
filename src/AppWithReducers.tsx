import React, {useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoList} from "./TodoList";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskReducer
} from "./state/task-reducer";
import {TaskPriorities, TaskStatuses} from "./api/task-api";


function AppWithReducers() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolist, dispatchToTodolistReducer] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''},
    ])

    let [tasks, dispatchTasksReducer] = useReducer(taskReducer, {
        [todolistID1]: [
            {
                id: v1(), title: "HTML & CSS", status: TaskStatuses.Completed, todoListId: todolistID1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistID1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: "React", status: TaskStatuses.New, todoListId: todolistID1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
        ],
        [todolistID2]: [
            {
                id: v1(), title: "Auto", status: TaskStatuses.New, todoListId: todolistID2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {                id: v1(),
                title: "Mobile Phont", status: TaskStatuses.Completed, todoListId: todolistID2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
        ],
    })

    const removeTask = (todolistId: string, taskId: string) => {
        dispatchTasksReducer(removeTaskAC(todolistId, taskId))
    }

    const changeFilter = (todolistId: string, nextFilterValue: FilterValuesType) => {
        dispatchToTodolistReducer(changeFilterAC(todolistId, nextFilterValue))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatchTasksReducer(addTaskAC(todolistId, title))
    }
    const changeTaskStatus = (todolistId: string, id: string, status: TaskStatuses) => {
        dispatchTasksReducer(changeTaskStatusAC(id, status, todolistId))
    }
    const removeTodolist = (todolistId: string) => {
        dispatchToTodolistReducer(removeTodolistAC(todolistId))
    }
    const addTodolistHandler = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolistReducer(action)
        dispatchTasksReducer(action)

    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasksReducer(changeTaskTitleAC(taskId, title, todolistId))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolistReducer(changeTodolistTitleAC(todolistId, title))
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

export default AppWithReducers;
