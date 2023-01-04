import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

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
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
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
    return (
        <div className="App">
            {
                todolist.map(todo => {
                    let tasksForRender = tasks[todo.id];
                    if (todo.filter === 'active') {
                        tasksForRender = tasks[todo.id].filter(task => task.isDone === false)
                    } else if (todo.filter === 'completed') {
                        tasksForRender = tasks[todo.id].filter(task => task.isDone === true)
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
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
