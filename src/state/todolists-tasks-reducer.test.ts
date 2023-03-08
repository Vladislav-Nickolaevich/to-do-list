import {TasksStateType, TodolistsType} from "../App";
import {AddTodolistAC, TodolistReducer} from "./todolist-reducer";
import {TaskReducer} from "./task-reducer";

test('Ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistsType> = []

    const action = AddTodolistAC('New Todolist')

    const endTasksState = TaskReducer(startTasksState, action)
    const endTodolistsState = TodolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistID)
    expect(idFromTodolists).toBe(action.todolistID)
})