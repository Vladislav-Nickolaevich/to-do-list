import {v1} from "uuid";
import {TodolistsType} from "../App";

export const ADD_TODOLIST = "ADD-TODOLIST"
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

type TodolistsReducerActionType = DeleteTodolistACType
    | AddTodolistACType
    | UpdateTitleACType
    | ChangeFilterACType

export const TodolistReducer = (state: TodolistsType[], action: TodolistsReducerActionType) => {
    switch (action.type) {
        case REMOVE_TODOLIST: {
            return state.filter(el => el.id !== action.payload.todolistID1)
        }
        case ADD_TODOLIST: {
            const newTodo: TodolistsType = {id: action.todolistID, title: action.newTodolistTitle, filter: 'all'}
            return [...state, newTodo]
        }
        case CHANGE_TODOLIST_TITLE: {
            return state.map(item => item.id === action.todolistID2 ? {
                ...item,
                title: action.newTodolistTitle
            } : item)
        }
        case CHANGE_TODOLIST_FILTER: {
            return state.map(el => el.id === action.todolistID2 ? {
                ...el,
                filter: action.newFilter
            } : el)
        }
        default:
            return state
    }
}

type DeleteTodolistACType = ReturnType<typeof DeleteTodolistAC>
export const DeleteTodolistAC = (todolistID1: string) => {
    return {
        type: REMOVE_TODOLIST,
        payload: {
            todolistID1
        },
    } as const
}

export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (newTodolistTitle: string) => {
    return {
        type: ADD_TODOLIST,
        newTodolistTitle,
        todolistID: v1()
    } as const
}

type UpdateTitleACType = ReturnType<typeof UpdateTitleAC>
export const UpdateTitleAC = (todolistID2: string, newTodolistTitle: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        todolistID2,
        newTodolistTitle
    } as const
}

type ChangeFilterACType = ReturnType<typeof ChangeFilterAC>
export const ChangeFilterAC = (todolistID2: string, newFilter: string) => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        todolistID2,
        newFilter
    } as const
}