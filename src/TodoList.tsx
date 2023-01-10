import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {Input} from "./components/Input";


type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, nextFilterValue: FilterValuesType) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, id: string, value: boolean) => void
    filter: FilterValuesType
    onClickDeleteTodolist: (todolistId: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const {todolistId, filter, changeFilter, changeTaskStatus, tasks, removeTask} = props
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

    const allClickHandler = () => changeFilter(todolistId, 'all')
    const activeClickHandler = () => changeFilter(todolistId, 'active')
    const completedClickHandler = () => changeFilter(todolistId, 'completed')
    const onClickDeleteTodolist = () => props.onClickDeleteTodolist(props.todolistId)
    const addTaskHandler = (title:string) => {
        props.addTask(props.todolistId, title)
    }
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onClickDeleteTodolist}>x</button>
            </h3>

            <Input title={props.title} addTask={addTaskHandler}/>
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