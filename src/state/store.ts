import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {taskReducer, TaskReducerActionType} from "./task-reducer";
import {todolistReducer, TodolistsReducerActionType} from "./todolist-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../app/app-reducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: appReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

type ThunkDispatchType = ThunkDispatch<AppRootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkDispatchType>()


export type ActionsType = TaskReducerActionType | TodolistsReducerActionType

export type AppThunk<ReturnType = void> = ThunkAction<    ReturnType, AppRootState, unknown, ActionsType>

export const useAppSelector : TypedUseSelectorHook<AppRootState> = useSelector
// @ts-ignore
window.store = store;



