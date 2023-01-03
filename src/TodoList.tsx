import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";



type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (nextFilterValue:FilterValuesType) => void
    addTask: (value: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const tasksListsItems = props.tasks.map((task) => {
        const onClickHandler = () => props.removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickHandler}>X</button>
            </li>
        );
    })
    const [value, setValue] = useState('')
    const inputOnChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onKeyDownInput = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            onClickAddHandler()
        }
    }
    const onClickAddHandler = () => {
        if(value.trim() !== ''){
            props.addTask(value)
            setValue('')
        } else {
            setValue('')
        }

    }
    const allClickHandler = () => props.changeTodoListFilter('all')
    const activeClickHandler = () => props.changeTodoListFilter('active')
    const completedClickHandler = () => props.changeTodoListFilter('completed')
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={value}
                    onChange={inputOnChangeHandler}
                    onKeyDown={onKeyDownInput}
                />
                <button onClick={onClickAddHandler}>+</button>
            </div>
            <ul>
                {tasksListsItems}
            </ul>
            <div>
                <button onClick={allClickHandler}>All</button>
                <button onClick={activeClickHandler}>Active</button>
                <button onClick={completedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;