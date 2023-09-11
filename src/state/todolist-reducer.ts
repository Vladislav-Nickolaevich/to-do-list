import {v1} from "uuid";
import {todolistApi, TodolistType} from "../api/todoist-api";
import {Dispatch} from "redux";
import {ActionsType, AppThunk} from "./store";


export const ADD_TODOLIST = "ADD-TODOLIST"
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const GET_TODOLISTS_API = 'GET-TODOLISTS-API'

export type TodolistsReducerActionType = RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeFilterACType
    | GetTodolistsAC



export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {filter: FilterValuesType}

const initialState: TodolistDomainType[] = [
    // {id: todolistID1, title: 'What to learn', filter: 'all'},
    // {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: ActionsType):TodolistDomainType[] => {
    switch (action.type) {
        case "GET-TODOLISTS-API": {
            return action.todolist.map(el => ({...el, filter: 'all'}))
        }
        case REMOVE_TODOLIST: {
            return state.filter(el => el.id !== action.todolistID)
        }
        case ADD_TODOLIST: {
            const newTodo: TodolistDomainType = {...action.newTodolist, filter: 'all'}
            // const newTodo: TodolistDomainType = {id: action.todolistID, title: action.newTodolistTitle, filter: 'all', addedDate: '', order: 0}
            return [newTodo, ...state]
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

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) =>
    ({type: REMOVE_TODOLIST, todolistID} as const)

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolist: TodolistType) =>
    ({type: ADD_TODOLIST,newTodolist} as const)
    // ({type: ADD_TODOLIST,newTodolistTitle, todolistID: v1()} as const)

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistID2: string, newTodolistTitle: string) =>
    ({ type: CHANGE_TODOLIST_TITLE, todolistID2, newTodolistTitle} as const)

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID2: string, newFilter: FilterValuesType) =>
    ({type: CHANGE_TODOLIST_FILTER, todolistID2, newFilter} as const)


export type GetTodolistsAC =  ReturnType<typeof getTodolistsAC>
export const getTodolistsAC = (todolist: TodolistType[]) => ({type: GET_TODOLISTS_API, todolist} as const)



export const setTodolistsTC = (): AppThunk => (dispatch) => {
    todolistApi.getTodolist()
        .then(res => dispatch(getTodolistsAC(res.data)))
}

export const createTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistApi.createdTodolist(title)
        .then(res => dispatch(addTodolistAC(res.data.data.item)))
}

export const deleteTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistApi.deleteTodolist(todolistId)
        .then(res => dispatch(removeTodolistAC(todolistId)))
}

export const updateTodolistTitleTC = (todolistId: string,title: string): AppThunk => (dispatch) => {
    todolistApi.updateTodolistTitle(todolistId, title)
        .then(res => dispatch(changeTodolistTitleAC(todolistId, title)))
}