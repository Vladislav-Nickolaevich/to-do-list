import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {TaskStatuses} from "../api/task-api";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    changeFilterAC,
    createTodolistTC,
    deleteTodolistTC,
    FilterValuesType, setTodolistsTC,
    TodolistDomainType, updateTodolistTitleTC
} from "./todolist-reducer";
import {useAppDispatch, useAppSelector} from "../app/store";
import {
    createTaskTC,
    removeTaskTC,
    TasksStateType,
    updateTaskStatusTC,
    updateTaskTitleTC
} from "./task-reducer";
import {Todolist} from "./TodolistsList/Todolist/Todolist";


export const TodolistList: React.FC = () => {
    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])


    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, nextFilterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, nextFilterValue))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, id: string, status: TaskStatuses) => {
        dispatch(updateTaskStatusTC(todolistId, id, status))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTitleTC(todolistId, taskId, title))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistTitleTC(todolistId, title))
    }, [dispatch])

    return (
        <div>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    );
}


// import React, {memo, useCallback, useEffect} from 'react';
// import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
// import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
// import {ButtonGroup, IconButton, Typography} from "@mui/material";
// import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
// import {ButtonWithMemo} from "../../components/ButtonWithMem";
// import Task from "./Todolist/Task/Task";
// import {TaskStatuses, TaskType} from "../../api/task-api";
// import {FilterValuesType} from "./todolist-reducer";
// import {useAppDispatch} from "../../app/store";
// import {setTodolistTasksTC} from "./task-reducer";
// import {RequestStatusType} from "../../app/app-reducer";
//
//
// type TodoListPropsType = {
//     todolistId: string
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (todolistId: string, taskId: string) => void
//     changeFilter: (todolistId: string, nextFilterValue: FilterValuesType) => void
//     addTask: (todolistId: string, value: string) => void
//     changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
//     filter: FilterValuesType
//     removeTodolist: (todolistId: string) => void
//     changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
//     changeTodolistTitle: (todolistId: string, title: string) => void
//     entityStatus: RequestStatusType
// }
//
// export const TodolistList = memo((props: TodoListPropsType) => {
//     const {
//         todolistId,
//         filter,
//         title,
//         changeFilter,
//         changeTaskStatus,
//         removeTask,
//         changeTaskTitle,
//         removeTodolist,
//         changeTodolistTitle,
//         addTask,
//         entityStatus
//     } = props
//
//
//     const dispatch = useAppDispatch()
//
//     let tasks = props.tasks;
//     if (filter === 'active') {
//         tasks = tasks.filter(task => task.status === TaskStatuses.New)
//     } else if (filter === 'completed') {
//         tasks = tasks.filter(task => task.status === TaskStatuses.Completed)
//     }
//
//
//
//     //For the <Task/> without Redux
//     const changeStatusHandler = useCallback((taskId: string, status: TaskStatuses) => {
//         changeTaskStatus(todolistId, taskId, status)
//     }, [changeTaskStatus, todolistId])
//
//     const removeTaskHandler = useCallback((taskId: string) => {
//         removeTask(todolistId, taskId)
//     }, [removeTask, todolistId])
//
//     const changeTaskTitleHandler = useCallback((taskId: string, title: string) => {
//         changeTaskTitle(todolistId, taskId, title)
//     }, [changeTaskTitle, todolistId])
//
//
//     useEffect(() => {
//         dispatch(setTodolistTasksTC(todolistId))
//     }, [])
//     const tasksListsItems = tasks.map((task) => {
//         return (
//             <Task
//                 key={task.id}
//                 task={task}
//                 changeTaskStatus={changeStatusHandler}
//                 removeTask={removeTaskHandler}
//                 changeTaskTitle={changeTaskTitleHandler}
//                 todolistId={todolistId}
//             />
//
//             // <TaskWithRedux key={task.id} task={task} todolistId={todolistId}/>
//         );
//     })
//
//     const allClickHandler = useCallback(() => changeFilter(todolistId, 'all'), [changeFilter, todolistId])
//
//     const activeClickHandler = useCallback(() => changeFilter(todolistId, 'active'), [changeFilter, todolistId])
//
//     const completedClickHandler = useCallback(() => changeFilter(todolistId, 'completed'), [changeFilter, todolistId])
//
//     const onClickDeleteTodolist = () => removeTodolist(todolistId)
//
//     const addTaskHandler = useCallback((title: string) => {
//         addTask(todolistId, title)
//     }, [addTask, todolistId])
//
//     const changeTodolistTitleHandler = useCallback((title: string) => {
//         changeTodolistTitle(todolistId, title)
//     }, [changeTodolistTitle, todolistId])
//
//     return (
//         <div>
//             <span>
//                 <Typography variant='h6' align='center'>
//                 <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
//                     <IconButton
//                         disabled={entityStatus === 'loading'}
//                         onClick={onClickDeleteTodolist}
//                     >
//                         <CancelPresentationIcon/>
//                     </IconButton>
//                 </Typography>
//             </span>
//
//             <AddItemForm
//                 addTask={addTaskHandler}
//                 disabled={entityStatus === 'loading'}
//             />
//             <ul>
//                 {tasksListsItems}
//             </ul>
//             <div>
//                 <ButtonGroup
//                     disableElevation
//                     size='small'
//                     variant="contained"
//                     fullWidth>
//                     <ButtonWithMemo
//                         title={'All'}
//                         size={'10'}
//                         onClick={allClickHandler}
//                         color={filter === 'all' ? "secondary" : "primary"}
//                     />
//                     <ButtonWithMemo
//                         title={'Active'}
//                         size={'10'}
//                         onClick={activeClickHandler}
//                         color={filter === 'active' ? "secondary" : "primary"}
//                     />
//                     <ButtonWithMemo
//                         title={'Completed'}
//                         size={'10'}
//                         onClick={completedClickHandler}
//                         color={filter === 'completed' ? "secondary" : "primary"}
//                     />
//                 </ButtonGroup>
//             </div>
//         </div>
//     );
// })


