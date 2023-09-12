import axios, {AxiosResponse} from "axios";
import {ResponseType} from "../api/task-api";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true
})

export type TodolistType = {
    addedDate: Date | string
    id: string
    order: number
    title: string
}

export const todolistApi = {
    getTodolist() {
        return instance
            .get<TodolistType[]>("/todo-lists")
    },
    createdTodolist(title: string) {
        return instance
            .post<
                ResponseType<{item: TodolistType}>,
                AxiosResponse<ResponseType<{item: TodolistType}>>,
                {title: string}
                >("/todo-lists", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance
            .delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance
            .put<
                ResponseType,
                AxiosResponse<ResponseType>,
                {title: string}
                >(`/todo-lists/${todolistId}`, {title})
    }
}