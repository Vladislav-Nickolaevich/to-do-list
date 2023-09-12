import {
    ADD_TODOLIST,
    AddTodolistACType,
    GetTodolistsAC, removeTodolistAC,
    RemoveTodolistACType, setEntityStatusTodolistAC
} from "./todolist-reducer";
import {v1} from "uuid";
import {ResultCodes, taskApi, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/task-api";
import {ActionsType, AppRootState, AppThunk} from "./store";
import {setErrorAC, setStatusAC, SetStatusACType} from "../app/app-reducer";
import {handlerServerNetworkError, handleServerAppError} from "../utils/util-error";
import axios from "axios";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'

const SET_TASKS_API = 'SET-TASKS-API'

export type TaskReducerActionType = RemoveACType
    | AddACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType
    | GetTodolistsAC
    | SetTaskACType
    | SetStatusACType


export let todolistID1 = v1();
export let todolistID2 = v1();

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {
//     [todolistID1]: [
//     {id: v1(), title: "HTML & CSS", isDone: true},
//     {id: v1(), title: "JS", isDone: true},
//     {id: v1(), title: "React", isDone: false},
//     {id: v1(), title: "Rest API", isDone: false},
//     {id: v1(), title: "TS", isDone: false},
// ],
}

export const taskReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "GET-TODOLISTS-API": {
            const stateCopy = {...state}
            action.todolist.forEach(t => {
                stateCopy[t.id] = []
            })
            return stateCopy
        }
        case SET_TASKS_API: {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        case REMOVE_TASK: {
            return {
                ...state,
                [action.todolistID1]: state[action.todolistID1]
                    .filter(el => el.id !== action.taskId)
            }
        }
        case ADD_TASK: {
            return {
                ...state,
                [action.todolistID1]: [action.task, ...state[action.todolistID1]]
            }
        }
        case CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskId ?
                        {...el, status: action.status}
                        : el
                    )
            }
        }
        case CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskId ?
                        {...el, title: action.newTitle} :
                        el
                    )
            }
        }
        case ADD_TODOLIST: {
            return {
                ...state,
                [action.newTodolist.id]: []
            }
        }
        case REMOVE_TODOLIST: {
            const copyState = {...state}
            delete copyState[action.todolistID]
            return copyState
        }
        default:
            return state
    }
}

type RemoveACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID1: string, taskId: string) =>
    ({type: REMOVE_TASK, todolistID1, taskId} as const)

type AddACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID1: string, task: TaskType) =>
    ({type: ADD_TASK, todolistID1, task} as const)

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistID: string) =>
    ({type: CHANGE_TASK_STATUS, taskId, status, todolistID} as const)

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistID: string) =>
    ({type: CHANGE_TASK_TITLE, taskId, newTitle, todolistID} as const)

type SetTaskACType = ReturnType<typeof setTaskAC>
export const setTaskAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: SET_TASKS_API, todolistId, tasks} as const)


export const setTodolistTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    taskApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTaskAC(todolistId, res.data.items))
            dispatch(setStatusAC('succeeded'))
        })
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    taskApi.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(setStatusAC('succeeded'))
            }else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => handlerServerNetworkError(dispatch, e.message))
}


// export const createTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
//     dispatch(setStatusAC('loading'))
//     try {
//         const res = await taskApi.createTask(todolistId, title)
//         if (res.data.resultCode === ResultCodes.OK) {
//             dispatch(addTaskAC(todolistId, res.data.data.item))
//             dispatch(setStatusAC('succeeded'))
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     } catch (e) {
//         if (axios.isAxiosError(e)) {
//             const error = e.response ? e.response.data.error : e.message
//             handlerServerNetworkError(dispatch, error)
//         } else {
//             handlerServerNetworkError(dispatch, (e as { message: string }).message)
//         }
//     }
// }

export const createTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    dispatch(setStatusAC('loading'))
        taskApi.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === ResultCodes.OK) {
                    dispatch(addTaskAC(todolistId, res.data.data.item))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(e => handlerServerNetworkError(dispatch, e.message))
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses): AppThunk =>
    (dispatch, getState: () => AppRootState) => {
        dispatch(setStatusAC('loading'))
        const task = getState().tasks[todolistId].find(el => el.id === taskId)
        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                status,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate
            }
            taskApi.updateTaskStatus(todolistId, taskId, model)
                .then(res => {
                    if (res.data.resultCode === ResultCodes.OK) {
                        dispatch(changeTaskStatusAC(taskId, status, todolistId))
                        dispatch(setStatusAC('succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch(e => handlerServerNetworkError(dispatch, e.message))
        }
    }

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    taskApi.updateTaskTitle(todolistId, taskId, title)
        .then(res => {
            if(res.data.resultCode === ResultCodes.OK){
                dispatch(changeTaskTitleAC(todolistId, taskId, title))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => handlerServerNetworkError(dispatch, e.message))
}




