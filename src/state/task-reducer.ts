import {TasksStateType} from "../App";
import {ADD_TODOLIST, AddTodolistACType} from "./todolist-reducer";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'

type TaskReducerActionType = RemoveACType
    | AddACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType


export const taskReducer = (state: TasksStateType, action: TaskReducerActionType):TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK: {
            return {
                ...state,
                [action.todolistID1]: state[action.todolistID1]
                    .filter(el => el.id !== action.taskId)
            }
        }
        case ADD_TASK: {
            const newTask = {id: '4', title: action.newTitle, isDone: false}
            return {
                ...state,
                [action.todolistID1]: [...state[action.todolistID1], newTask]
            }
        }
        case CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskId ?
                        {...el, isDone: action.isDone}
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
                [action.todolistID]: []
            }
        }
        case REMOVE_TODOLIST: {
            let copyState = {...state}
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
export const addTaskAC = (todolistID1: string, newTitle: string) =>
    ({type: ADD_TASK, todolistID1, newTitle} as const)

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string) =>
    ({type: CHANGE_TASK_STATUS, taskId, isDone, todolistID} as const)

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistID: string) =>
    ({type: CHANGE_TASK_TITLE, taskId, newTitle, todolistID} as const)

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) =>
    ({type: REMOVE_TODOLIST, todolistID} as const)
