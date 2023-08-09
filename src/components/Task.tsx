import React, {memo} from 'react';
import {Checkbox} from "./Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton, ListItem} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import {TaskStatuses, TaskType} from "../api/task-api";


type TaskPropsType = {
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle:(taskId: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
const Task = memo(({task, removeTask, changeTaskTitle, changeTaskStatus, todolistId}: TaskPropsType) => {
    let {id, title, status} = task

    const removeTaskHandler = () => removeTask(id, todolistId)
    const changeStatusHandler = (eventValue: boolean) => changeTaskStatus(id, eventValue? TaskStatuses.Completed:TaskStatuses.New, todolistId)
    const changeTaskTitleHandler = (newTitle: string) => changeTaskTitle(id, newTitle, todolistId)

    return (
        <ListItem
            className={status === TaskStatuses.Completed ? "is-done" : ""}
            sx={{p: '0'}}
        >
            <Checkbox
                checked={status === TaskStatuses.Completed}
                callBack={changeStatusHandler}
            />
            <EditableSpan title={title} changeTitle={changeTaskTitleHandler}/>
            <IconButton
                size='small'
                onClick={removeTaskHandler}>
                <CancelPresentationIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    );
})

export default Task;