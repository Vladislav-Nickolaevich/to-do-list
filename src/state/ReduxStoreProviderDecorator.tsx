import React from 'react';
import {Provider} from "react-redux";
import {AppRootState} from "./store";
import {combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/task-api";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

const initialGlobalState: AppRootState = {
    todolists:[
        {id: 'todolistID1', title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: 'todolistID2', title: 'What to buy', filter: 'all', order: 1, addedDate: ''}
    ],
    tasks: {
        ['todolistID1']: [
            {
                id: v1(), title: "HTML & CSS", status: TaskStatuses.Completed, todoListId: 'todolistID1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistID1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: "React", status: TaskStatuses.New, todoListId: 'todolistID1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
        ],
        ['todolistID2']: [
            {
                id: v1(), title: "Auto", status: TaskStatuses.New, todoListId: 'todolistID2', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: "Mobile Phone", status: TaskStatuses.Completed, todoListId: 'todolistID2', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            }
        ],
    }
}



export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    )
}