import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../App";

export const ADD_TODOLIST = "ADD-TODOLIST"
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

type TodolistsReducerActionType = DeleteTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeFilterACType


export const todolistReducer = (state: TodolistsType[], action: TodolistsReducerActionType):TodolistsType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST: {
            return state.filter(el => el.id !== action.todolistID1)
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
            throw new Error("I don't understand this type")
    }
}

type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todolistID1: string) =>
    ({type: REMOVE_TODOLIST, todolistID1} as const)

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistTitle: string) =>
    ({type: ADD_TODOLIST,newTodolistTitle, todolistID: v1()} as const)

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistID2: string, newTodolistTitle: string) =>
    ({ type: CHANGE_TODOLIST_TITLE, todolistID2, newTodolistTitle} as const)

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID2: string, newFilter: FilterValuesType) =>
    ({type: CHANGE_TODOLIST_FILTER, todolistID2, newFilter} as const)
