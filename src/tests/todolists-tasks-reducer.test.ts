import {addTodolistAC, TodolistDomainType, todolistReducer} from "../features/todolist-reducer";
import {taskReducer, TasksStateType} from "../features/task-reducer";

test('Ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []
    const newTodo = {
        id: "a2dfe62b-ebce-4b37-9581-1cc77ebc999f",
        title: 'New Todolist',
        addedDate: "",
        order: 0
    }
    const action = addTodolistAC(newTodo)

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.newTodolist.id)
    expect(idFromTodolists).toBe(action.newTodolist.id)
})