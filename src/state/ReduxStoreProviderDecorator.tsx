import React from 'react';
import {Provider} from "react-redux";
import {AppRootState, store} from "./store";
import {combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

const initialGlobalState = {
    todolists:[
        {id: 'todolistID1', title: 'What to learn', filter: 'all'},
        {id: 'todolistID2', title: 'What to buy', filter: 'all'},
    ],
    tasks: {
        ['todolistID1']: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "TS", isDone: false},
        ],
        ['todolistID2']: [
            {id: v1(), title: "Auto", isDone: false},
            {id: v1(), title: "Scissors", isDone: true},
            {id: '112233', title: "Mobile Phone", isDone: true},
        ],
    }
}



export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    )
}