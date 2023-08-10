import React, {memo, useCallback, useEffect} from 'react';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {ButtonGroup, IconButton, Typography} from "@mui/material";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import {ButtonWithMemo} from "./components/ButtonWithMem";
import Task from "./components/Task";
import {TaskStatuses, TaskType} from "./api/task-api";
import {FilterValuesType} from "./state/todolist-reducer";
import {useAppDispatch} from "./state/store";
import {setTodolistTasksTC} from "./state/task-reducer";


type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, nextFilterValue: FilterValuesType) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
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
        changeTaskStatus,
        removeTask,
        changeTaskTitle,
        removeTodolist,
        changeTodolistTitle,
        addTask
    } = props


    const dispatch = useAppDispatch()

    let tasks = props.tasks;
    if (filter === 'active') {
        tasks = tasks.filter(task => task.status === TaskStatuses.New)
    } else if (filter === 'completed') {
        tasks = tasks.filter(task => task.status === TaskStatuses.Completed)
    }



    //For the <Task/> without Redux
    const changeStatusHandler = useCallback((taskId: string, status: TaskStatuses) => {
        changeTaskStatus(todolistId, taskId, status)
    }, [changeTaskStatus, todolistId])

    const removeTaskHandler = useCallback((taskId: string) => {
        removeTask(todolistId, taskId)
    }, [removeTask, todolistId])

    const changeTaskTitleHandler = useCallback((taskId: string, title: string) => {
        changeTaskTitle(todolistId, taskId, title)
    }, [changeTaskTitle, todolistId])


    useEffect(() => {
        dispatch(setTodolistTasksTC(todolistId))
    }, [])
    const tasksListsItems = tasks.map((task) => {
        return (
            <Task
                key={task.id}
                task={task}
                changeTaskStatus={changeStatusHandler}
                removeTask={removeTaskHandler}
                changeTaskTitle={changeTaskTitleHandler}
                todolistId={todolistId}
            />

            // <TaskWithRedux key={task.id} task={task} todolistId={todolistId}/>
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

            <AddItemForm addTask={addTaskHandler}/>
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


