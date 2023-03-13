import {combineReducers, createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todolistReducer} from "./todolist-reducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)


// @ts-ignore
window.store = store;



