import {
    ADD_TODOLIST,
    AddTodolistACType,
    GetTodolistsAC,
    RemoveTodolistACType
} from "./todolist-reducer";
import {v1} from "uuid";
import {taskApi, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/task-api";
import {ActionsType, AppRootState, AppThunk} from "./store";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'

const SET_TASKS_API = 'SET-TASKS-API'

export type TaskReducerActionType = RemoveACType
    | AddACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType
    | GetTodolistsAC
    | SetTaskACType


export let todolistID1 = v1();
export let todolistID2 = v1();

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {
//     [todolistID1]: [
//     {id: v1(), title: "HTML & CSS", isDone: true},
//     {id: v1(), title: "JS", isDone: true},
//     {id: v1(), title: "React", isDone: false},
//     {id: v1(), title: "Rest API", isDone: false},
//     {id: v1(), title: "TS", isDone: false},
// ],
}

export const taskReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "GET-TODOLISTS-API":{
            const stateCopy = {...state}
             action.todolist.forEach(t => {
                stateCopy[t.id] = []
            })
            return stateCopy
        }
        case SET_TASKS_API: {
            return {
                ...state,
                [action.todolitsId] : action.tasks
            }
        }
        case REMOVE_TASK: {
            return {
                ...state,
                [action.todolistID1]: state[action.todolistID1]
                    .filter(el => el.id !== action.taskId)
            }
        }
        case ADD_TASK: {
            return {
                ...state,
                [action.todolistID1]: [action.task, ...state[action.todolistID1]]
            }
        }
        case CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskId ?
                        {...el, status: action.status}
                        : el
                    )
            }
        }
        case CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskId ?
                        {...el, title: action.newTitle} :
                        el
                    )
            }
        }
        case ADD_TODOLIST: {
            return {
                ...state,
                [action.newTodolist.id]: []
            }
        }
        case REMOVE_TODOLIST: {
            const copyState = {...state}
            delete copyState[action.todolistID]
            return copyState
        }
        default:
            return state
    }
}

type RemoveACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID1: string, taskId: string) =>
    ({type: REMOVE_TASK, todolistID1, taskId} as const)

type AddACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID1: string, task: TaskType) =>
    ({type: ADD_TASK, todolistID1, task} as const)

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistID: string) =>
    ({type: CHANGE_TASK_STATUS, taskId, status, todolistID} as const)

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistID: string) =>
    ({type: CHANGE_TASK_TITLE, taskId, newTitle, todolistID} as const)

type SetTaskACType = ReturnType<typeof setTaskAC>
export const setTaskAC = (todolitsId: string, tasks: TaskType[]) =>
    ({type: SET_TASKS_API, todolitsId, tasks} as const)




export const setTodolistTasksTC = (todolitsId: string):AppThunk => (dispatch) => {
    taskApi.getTasks(todolitsId)
        .then(res => dispatch(setTaskAC(todolitsId, res.data.items)))
}

export const removeTaskTC = (todolitsId: string, taskId: string): AppThunk => (dispatch) => {
    taskApi.deleteTask(todolitsId, taskId)
        .then(res => dispatch(removeTaskAC(todolitsId, taskId)))
}


export const createTaskTC = (todolitsId: string, title: string): AppThunk => (dispatch) => {
    taskApi.createTask(todolitsId, title)
        .then(res => dispatch(addTaskAC(todolitsId , res.data.data.item)))
}

export const updateTaskStatusTC = (todolitsId: string, taskId: string, status: TaskStatuses): AppThunk =>
    (dispatch, getState: () => AppRootState) => {
    const task = getState().tasks[todolitsId].find(el => el.id === taskId)
    if(task){
        const model: UpdateTaskModelType = {
            title: task.title,
            status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate
        }
        taskApi.updateTaskStatus(todolitsId, taskId, model)
            .then(res => dispatch(changeTaskStatusAC(taskId, status,todolitsId)))
    }
}

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunk  => (dispatch) => {
    taskApi.updateTaskTitle(todolistId, taskId, title)
        .then(res => dispatch(changeTaskTitleAC(taskId, title, todolistId)))
    }




