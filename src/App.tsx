import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

function App() {
    const todoListTitle_1 = 'What to learn';
    const todoListTitle_2 = 'What to buy';

    const tasks_1 = [
        {id:1, title: 'HTML & CSS', isDone: true,},
        {id:2, title: 'JS', isDone: false,},
        {id:3, title: 'React', isDone: true,},
    ]
    const tasks_2 = [
        {id:4, title: 'Milk', isDone: true,},
        {id:5, title: 'Cola', isDone: false,},
        {id:6, title: 'Fanta', isDone: false,},
    ]
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            <TodoList title={todoListTitle_2} tasks={tasks_2}/>
        </div>
    );
}

export default App;
