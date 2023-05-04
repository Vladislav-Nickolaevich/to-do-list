import React, {memo, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";
import {ButtonGroup, IconButton, Typography} from "@mui/material";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
// import Task from "./components/Task";
import {ButtonWithMemo} from "./components/ButtonWithMem";
import TaskWithRedux from "./components/TaskWithRedux";


type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, nextFilterValue: FilterValuesType) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, id: string, value: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodoList = memo((props: TodoListPropsType) => {
    const {
        todolistId,
        filter,
        title,
        changeFilter,
        // changeTaskStatus,
        // removeTask,
        // changeTaskTitle,
        removeTodolist,
        changeTodolistTitle,
        addTask
    } = props

    let tasks = props.tasks;
    if (filter === 'active') {
        tasks = tasks.filter(task => !task.isDone)
    } else if (filter === 'completed') {
        tasks = tasks.filter(task => task.isDone)
    }
    // const changeStatusHandler = useCallback((taskId: string, eventValue: boolean) => {
    //     changeTaskStatus(todolistId, taskId, eventValue)
    // }, [changeTaskStatus, todolistId])

    // const removeTaskHandler = useCallback((taskId: string) => {
    //     removeTask(todolistId, taskId)
    // }, [removeTask, todolistId])

    // const changeTaskTitleHandler = useCallback((taskId: string, title: string) => {
    //     changeTaskTitle(todolistId, taskId, title)
    // }, [changeTaskTitle, todolistId])
    const tasksListsItems = tasks.map((task) => {
        return (
            // <Task
            //     key={task.id}
            //     task={task}
            //     changeTaskStatus={changeStatusHandler}
            //     removeTask={removeTaskHandler}
            //     changeTaskTitle={changeTaskTitleHandler}/>

            <TaskWithRedux key={task.id} task={task} todolistId={todolistId}/>
        );
    })

    const allClickHandler = useCallback(() => changeFilter(todolistId, 'all'), [changeFilter, todolistId])

    const activeClickHandler = useCallback(() => changeFilter(todolistId, 'active'), [changeFilter, todolistId])

    const completedClickHandler = useCallback(() => changeFilter(todolistId, 'completed'), [changeFilter, todolistId])

    const onClickDeleteTodolist = () => removeTodolist(todolistId)

    const addTaskHandler = useCallback((title: string) => {
        addTask(todolistId, title)
    }, [addTask, todolistId])

    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(todolistId, title)
    }, [changeTodolistTitle, todolistId])

    return (
        <div>
            <span>
                <Typography variant='h6' align='center'>
                <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
                    <IconButton onClick={onClickDeleteTodolist}>
                        <CancelPresentationIcon/>
                    </IconButton>
                </Typography>
            </span>

            <Input addTask={addTaskHandler}/>
            <ul>
                {tasksListsItems}
            </ul>
            <div>
                <ButtonGroup
                    disableElevation
                    size='small'
                    variant="contained"
                    fullWidth>
                    <ButtonWithMemo
                        title={'All'}
                        size={'10'}
                        onClick={allClickHandler}
                        color={filter === 'all' ? "secondary" : "primary"}
                    />
                    <ButtonWithMemo
                        title={'Active'}
                        size={'10'}
                        onClick={activeClickHandler}
                        color={filter === 'active' ? "secondary" : "primary"}
                    />
                    <ButtonWithMemo
                        title={'Completed'}
                        size={'10'}
                        onClick={completedClickHandler}
                        color={filter === 'completed' ? "secondary" : "primary"}
                    />
                </ButtonGroup>
            </div>
        </div>
    );
})


