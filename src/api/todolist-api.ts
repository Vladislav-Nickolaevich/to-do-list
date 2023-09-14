import {AxiosResponse} from "axios";
import {instance, ResponseType, TodolistType} from "../api/task-api";


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