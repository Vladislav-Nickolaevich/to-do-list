import React, {useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {Input} from "./components/Input";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoList} from "./TodoList";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/task-reducer";


export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithReducers() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolist, dispatchToTodolistReducer] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasksReducer] = useReducer(taskReducer, {
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
        dispatchTasksReducer(removeTaskAC(todolistId, taskId))
    }

    const changeFilter = (todolistId: string, nextFilterValue: FilterValuesType) => {
        dispatchToTodolistReducer(changeFilterAC(todolistId, nextFilterValue))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatchTasksReducer(addTaskAC(todolistId, title))
    }
    const changeTaskStatus = (todolistId: string, id: string, value: boolean) => {
        dispatchTasksReducer(changeTaskStatusAC(id, value, todolistId))
    }
    const onClickDeleteTodolist = (todolistId: string) => {
        dispatchToTodolistReducer(deleteTodolistAC(todolistId))
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
