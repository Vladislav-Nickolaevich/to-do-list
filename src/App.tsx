import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {Input} from "./components/Input";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistsType = {
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
    const addTodolistHandler = (title:string) => {
        let newId = v1()
        const newTodo:TodolistsType = {id: newId, title, filter: 'all'}
        setTodolist([newTodo, ...todolist])
        setTasks({[newId]: [], ...tasks})
    }
    return (
        <div className="App">
            <Input title={'helo'} addTask={addTodolistHandler}/>
            {
                todolist.map(todo => {
                    let tasksForRender = tasks[todo.id];
                    if (todo.filter === 'active') {
                        tasksForRender = tasks[todo.id].filter(task => !task.isDone)
                    } else if (todo.filter === 'completed') {
                        tasksForRender = tasks[todo.id].filter(task => task.isDone)
                    }
                    return (
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
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
