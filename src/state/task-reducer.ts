import {TasksStateType} from "../App";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
type TaskReducerActionType = RemoveACType | AddACType | ChangeTaskStatusACType


export const TaskReducer = (state: TasksStateType, action: TaskReducerActionType) => {
    switch (action.type) {
        case REMOVE_TASK: {
            return {
                ...state,
                [action.todolistID1]:state[action.todolistID1]
                    .filter(el => el.id !== action.taskId)
            }
        }
        case ADD_TASK: {
            const newTask = {id: '4', title: action.newTitle, isDone: false}
            return {
                ...state,
                [action.todolistID1]:[...state[action.todolistID1], newTask]
            }
        }
        case CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.todolistID2]: state[action.todolistID2]
                    .map(el => el.id === action.taskId?
                        {...el, isDone: action.isDone}
                        : el
                    )
            }
        }
        default:
            throw new Error("I don't understand this type")
    }
}

type RemoveACType = ReturnType<typeof RemoveAC>
export const RemoveAC = (todolistID1: string, taskId: string) => ({type: REMOVE_TASK, todolistID1, taskId} as const)

type AddACType = ReturnType<typeof AddAC>
export const AddAC = (todolistID1: string, newTitle: string) => ({type: ADD_TASK, todolistID1, newTitle} as const)


type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todolistID2: string) => ({type: CHANGE_TASK_STATUS,taskId, isDone, todolistID2}as const)