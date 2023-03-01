import {v1} from "uuid";
import {TodolistsType} from "../App";



export const TodolistReducer=(state: TodolistsType[], action: TodolistsReducerActionType)=> {
    switch (action.type){
        case 'REMOVE-TODOLIST':{
            return state.filter(el => el.id !== action.payload.todolistID1)
        }
        case 'ADD-TODOLIST':{
            const newID = v1()
            const newTodo: TodolistsType = {id: newID, title: action.payload.newTodolistTitle, filter: 'all'}
            return [...state, newTodo]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            return state.map(item => item.id === action.payload.todolistID2 ? {...item, title: action.payload.newTodolistTitle} : item)
        }
        case 'CHANGE-TODOLIST-FILTER':{
            return state.map(el => el.id === action.payload.todolistID2 ? {...el, filter: action.payload.newFilter} : el)
        }
        default: return state
    }
}

type TodolistsReducerActionType = DeleteTodolistACType | AddTodolistACType | updateTitleACType | changeFilterACType

type DeleteTodolistACType = ReturnType<typeof DeleteTodolistAC>

export const DeleteTodolistAC = (todolistID1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload:{
            todolistID1
        },

    } as const
}


type AddTodolistACType = ReturnType<typeof AddTodolistAC>

export const AddTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload:{
            newTodolistTitle
        }
    } as const
}


type updateTitleACType = ReturnType<typeof updateTitleAC>
export const updateTitleAC = (todolistID2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload:{
            todolistID2, newTodolistTitle
        }
    }as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID2: string, newFilter: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistID2, newFilter
        }
    } as const
}