import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";


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
    updateTask:(todolistId: string, taskId: string, title: string) => void
    updateTitle: (todolistId: string, title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const {todolistId, filter, changeFilter, changeTaskStatus, tasks, removeTask} = props
    const tasksListsItems = tasks.map((task) => {
        const onClickHandler = () => removeTask(todolistId, task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            changeTaskStatus(todolistId, task.id, newIsDoneValue)
        }
        const updateTaskHandler = (newTitle: string) => {
            props.updateTask(props.todolistId, task.id, newTitle)
        }
        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeHandler}
                />
                <EditableSpan title={task.title} updateTask={updateTaskHandler}/>
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
    const updateTitle = (title: string) => {
        props.updateTitle(props.todolistId, title)
    }
    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan title={props.title} updateTask={updateTitle}/>
                <button onClick={onClickDeleteTodolist}>x</button>
            </h3>

            <Input addTask={addTaskHandler}/>
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