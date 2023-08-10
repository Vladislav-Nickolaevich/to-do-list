import axios from "axios";
import {Dispatch} from "redux";
import {getTodolistAC} from "../state/todolist-reducer";

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
type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export const todolistApi = {
    getTodolist() {
        return instance
            .get<TodolistType[]>("/todo-lists")
    },
    createdTodolist(title: string) {
        return instance
            .post<ResponseType<{item: TodolistType}>>("/todo-lists", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance
            .delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance
            .put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    }
}