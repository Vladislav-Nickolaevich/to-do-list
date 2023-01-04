import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";


type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, nextFilterValue: FilterValuesType) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, id: string, value: boolean) => void
    filter: FilterValuesType
}

const TodoList = (props: TodoListPropsType) => {
    const {todolistId, filter, changeFilter, title, changeTaskStatus, tasks, addTask, removeTask} = props
    const tasksListsItems = tasks.map((task) => {
        const onClickHandler = () => removeTask(todolistId, task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            changeTaskStatus(todolistId, task.id, newIsDoneValue)
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
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAdd()
        }
    }
    const onClickAdd = () => {
        if (value.trim() !== '') {
            addTask(todolistId, value)
            setValue('')
            setError(null)
        } else {
            setValue('')
            setError('Title is required')
        }

    }
    const allClickHandler = () => changeFilter(todolistId, 'all')
    const activeClickHandler = () => changeFilter(todolistId, 'active')
    const completedClickHandler = () => changeFilter(todolistId, 'completed')
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={value}
                    onChange={inputOnChangeHandler}
                    onKeyDown={onKeyDownInput}
                    className={error ? 'error' : ''}
                />
                <button onClick={onClickAdd}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {tasksListsItems}
            </ul>
            <div>
                <button onClick={allClickHandler}
                        className={filter === 'all' ? 'active' : ''}>All
                </button>
                <button onClick={activeClickHandler}
                        className={filter === 'active' ? 'active' : ''}>Active
                </button>
                <button onClick={completedClickHandler}
                        className={filter === 'completed' ? 'active' : ''}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;