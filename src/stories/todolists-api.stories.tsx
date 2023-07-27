import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todoist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolist()
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'JS'
        todolistApi.createdTodolist(title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b7b1de77-c8cc-4b30-aa06-1ff0d46d58c4'
        todolistApi.deleteTodolist(todolistId)
            .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '450e5c25-7446-4159-a14a-4f976df0b7c5'
        const title = 'TS'
        todolistApi.updateTodolist(todolistId, title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}