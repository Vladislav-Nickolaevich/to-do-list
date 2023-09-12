import {todolistApi, TodolistType} from "../api/todoist-api";
import {ActionsType, AppThunk} from "./store";
import {RequestStatusType, setErrorAC, SetErrorACType, setStatusAC, SetStatusACType} from "../app/app-reducer";
import {handlerServerNetworkError, handleServerAppError} from "../utils/util-error";
import {ResultCodes} from "../api/task-api";


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
    | SetStatusACType
    | SetErrorACType
    | ReturnType<typeof setEntityStatusTodolistAC>


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: TodolistDomainType[] = [
    // {id: todolistID1, title: 'What to learn', filter: 'all'},
    // {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: ActionsType):TodolistDomainType[] => {
    switch (action.type) {
        case "GET-TODOLISTS-API": {
            return action.todolist.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        }
        case REMOVE_TODOLIST: {
            return state.filter(el => el.id !== action.todolistID)
        }
        case ADD_TODOLIST: {
            const newTodo: TodolistDomainType = {...action.newTodolist, filter: 'all', entityStatus: "idle"}
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
        case 'SET_ENTITY_STATUS_TODOLIST':
            return state.map(el => el.id === action.id? {...el, entityStatus: action.status}: el)
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

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistID2: string, newTodolistTitle: string) =>
    ({ type: CHANGE_TODOLIST_TITLE, todolistID2, newTodolistTitle} as const)

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID2: string, newFilter: FilterValuesType) =>
    ({type: CHANGE_TODOLIST_FILTER, todolistID2, newFilter} as const)


export type GetTodolistsAC =  ReturnType<typeof getTodolistsAC>
export const getTodolistsAC = (todolist: TodolistType[]) => ({type: GET_TODOLISTS_API, todolist} as const)

export const setEntityStatusTodolistAC = (id: string, status: RequestStatusType) =>
    ({type:"SET_ENTITY_STATUS_TODOLIST", id, status} as const)

export const setTodolistsTC = (): AppThunk => (dispatch) => {
    todolistApi.getTodolist()

        .then(res => dispatch(getTodolistsAC(res.data)))
        .catch(e => handlerServerNetworkError(dispatch, e.message))
        .finally(() => dispatch(setStatusAC('idle')))
}

export const createTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistApi.createdTodolist(title)
        .then(res => {
            if(res.data.resultCode === ResultCodes.OK){
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => handlerServerNetworkError(dispatch, e.message))
}

export const deleteTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    dispatch(setEntityStatusTodolistAC(todolistId, 'loading'))
    todolistApi.deleteTodolist(todolistId)
        .then(res => {
            if(res.data.resultCode === ResultCodes.OK){
                dispatch(removeTodolistAC(todolistId))
                dispatch(setStatusAC('succeeded'))
            }else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => handlerServerNetworkError(dispatch, e.message))
}

export const updateTodolistTitleTC = (todolistId: string,title: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistApi.updateTodolistTitle(todolistId, title)
        .then(res => {
            if(res.data.resultCode === ResultCodes.OK){
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(setStatusAC('succeeded'))
            }else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch(e => handlerServerNetworkError(dispatch, e.message))
}