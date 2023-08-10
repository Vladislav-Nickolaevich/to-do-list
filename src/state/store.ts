import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todolistReducer} from "./todolist-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

type ThunkDispatchType = ThunkDispatch<AppRootState, any, AnyAction>
export const useAppDispatch = useDispatch<ThunkDispatchType>

// @ts-ignore
window.store = store;



