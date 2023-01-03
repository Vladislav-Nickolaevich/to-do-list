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

function App() {
    const todoListTitle: string = 'What to learn';

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true}
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>('all')
  
    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
    }

    const changeFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue)
    }
    let tasksForRender: Array<TaskType> = [];
    if (filter === 'all') {
        tasksForRender = tasks
    } else if (filter === 'active') {
        tasksForRender = tasks.filter(task => task.isDone === false)
    } else if (filter === 'completed') {
        tasksForRender = tasks.filter(task => task.isDone === true)
    }

    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }
    const changeTaskStatus = (id: string,value: boolean) => {
        setTasks(tasks.map(el => el.id === id? {...el, isDone: value}: el))
    }
    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
