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

    const changeTodoListFilter = (nextFilterValue: FilterValuesType) => {
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
    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      addTask={addTask}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}/>
        </div>
    );
}

export default App;
