import React, {useEffect, useState} from 'react'
import {taskApi} from "../api/task-api";

export default {
    title: 'API-tasks'
}

const todolistId = '345ad95b-58d5-48ae-986a-6e1bb4138111'

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskApi.getTasks(todolistId)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'input'
        taskApi.createTask(todolistId, title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = 'b93041f4-6178-45e6-aa20-becd11beecbc'
        taskApi.deleteTask(todolistId, id)
            .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}



export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = 'e1bb3c5a-d63a-4036-a731-62b41eafb25e'
        const title = 'hr'
        taskApi.updateTaskTitle(todolistId, id, title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}