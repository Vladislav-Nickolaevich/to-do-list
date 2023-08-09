import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true
})

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    id: string
    title: string
    description: null | string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | Date | null
    deadline: null | string
    addedDate: Date | string
}
type GetTaskResponseType = {
    error: null
    items: TaskType[]
    totalCount: number
}
type ResponseTaskType<T = {}> = {
    data: T
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}


export const taskApi = {
    getTasks(todolistId: string) {
        return instance
            .get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance
            .post<ResponseTaskType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance
            .delete<ResponseTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string) {
        return instance
            .put<ResponseTaskType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}