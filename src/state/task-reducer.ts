import {TasksStateType} from "../App";
import {ADD_TODOLIST, AddTodolistACType, RemoveTodolistACType} from "./todolist-reducer";
import {v1} from "uuid";

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


export let todolistID1 = v1();
export let todolistID2 = v1();

const initialState: TasksStateType = {
//     [todolistID1]: [
//     {id: v1(), title: "HTML & CSS", isDone: true},
//     {id: v1(), title: "JS", isDone: true},
//     {id: v1(), title: "React", isDone: false},
//     {id: v1(), title: "Rest API", isDone: false},
//     {id: v1(), title: "TS", isDone: false},
// ],
//     [todolistID2]: [
//     {id: v1(), title: "Auto", isDone: false},
//     {id: v1(), title: "Scissors", isDone: true},
//     {id: v1(), title: "Mobile Phone", isDone: false},
// ],
}

export const taskReducer = (state = initialState, action: TaskReducerActionType):TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK: {
            return {
                ...state,
                [action.todolistID1]: state[action.todolistID1]
                    .filter(el => el.id !== action.taskId)
            }
        }
        case ADD_TASK: {
            const newTask = {id: action.taskID, title: action.newTitle, isDone: false}
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
export const addTaskAC = (todolistID1: string, newTitle: string) =>
    ({type: ADD_TASK, todolistID1 , newTitle, taskID: v1()} as const)

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string) =>
    ({type: CHANGE_TASK_STATUS, taskId, isDone, todolistID} as const)

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistID: string) =>
    ({type: CHANGE_TASK_TITLE, taskId, newTitle, todolistID} as const)


