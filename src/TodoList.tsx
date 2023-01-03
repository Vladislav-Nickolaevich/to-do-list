import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";



type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (nextFilterValue:FilterValuesType) => void
    addTask: (value: string) => void
    changeTaskStatus: (id: string,value: boolean) => void
    filter: FilterValuesType
}

const TodoList = (props: TodoListPropsType) => {

    const tasksListsItems = props.tasks.map((task) => {
        const onClickHandler = () => props.removeTask(task.id)
        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeTaskStatus(task.id, newIsDoneValue)
        }
        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeHandler}
                />
                <span>{task.title}</span>
                <button onClick={onClickHandler}>X</button>
            </li>
        );
    })
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)
    const inputOnChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onKeyDownInput = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            onClickAdd()
        }
    }
    const onClickAdd = () => {
        if(value.trim() !== ''){
            props.addTask(value)
            setValue('')
            setError(null)
        } else {
            setValue('')
            setError('Title is required')
        }

    }
    const allClickHandler = () => props.changeFilter('all')
    const activeClickHandler = () => props.changeFilter('active')
    const completedClickHandler = () => props.changeFilter('completed')
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={value}
                    onChange={inputOnChangeHandler}
                    onKeyDown={onKeyDownInput}
                    className={error? 'error': ''}
                />
                <button onClick={onClickAdd}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {tasksListsItems}
            </ul>
            <div>
                <button onClick={allClickHandler}
                        className={props.filter === 'all'?'active': ''}>All</button>
                <button onClick={activeClickHandler}
                        className={props.filter === 'active'?'active': ''}>Active</button>
                <button onClick={completedClickHandler}
                        className={props.filter === 'completed'?'active': ''}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;