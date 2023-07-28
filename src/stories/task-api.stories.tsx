import React, {useState} from 'react'
import {taskApi} from "../api/task-api";

export default {
    title: 'API-tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const getTask = () => {
        taskApi.getTasks(todolistId)
            .then(res => setState(res.data))
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder='TodoId' onChange={e => setTodolistId(e.currentTarget.value)} value={todolistId}/>
            <button onClick={getTask}>get Task</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>(null)

    const createTask = () => {
        taskApi.createTask(todolistId, taskTitle)
            .then(res => setState(res.data))
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder='todo Id' onChange={e => setTodolistId(e.currentTarget.value)} value={todolistId} />
            <input placeholder='task title' onChange={e => setTaskTitle(e.currentTarget.value)} value={taskTitle}/>
            <button onClick={createTask}>Create task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)

    const deleteTask = () => {
        taskApi.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <input placeholder='todo Id' onChange={e => setTodolistId(e.currentTarget.value)} value={todolistId}/>
        <input placeholder='task Id' onChange={e => setTaskId(e.currentTarget.value)} value={taskId}/>
        <button onClick={deleteTask}>Delete task</button>
    </div>
}



export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>(null)

    const updateTaskTitle = () => {
        taskApi.updateTaskTitle(todolistId, taskId, taskTitle)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder='todolist Id' onChange={e => setTodolistId(e.currentTarget.value)} value={todolistId}/>
            <input placeholder='task Id' onChange={e => setTaskId(e.currentTarget.value)} value={taskId}/>
            <input placeholder='new title' onChange={e => setTaskTitle(e.currentTarget.value)} value={taskTitle}/>
            <button onClick={updateTaskTitle}>Update title</button>
        </div>
    </div>
}