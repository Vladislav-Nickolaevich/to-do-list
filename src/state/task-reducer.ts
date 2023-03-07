import {TasksStateType} from "../App";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
type TaskReducerActionType = RemoveACType | AddACType


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
        default:
            throw new Error("I don't understand this type")
    }
}

type RemoveACType = ReturnType<typeof RemoveAC>
export const RemoveAC = (todolistID1: string, taskId: string) => ({type: REMOVE_TASK, todolistID1, taskId} as const)

type AddACType = ReturnType<typeof AddAC>
export const AddAC = (todolistID1: string, newTitle: string) => ({type: ADD_TASK, todolistID1, newTitle} as const)




