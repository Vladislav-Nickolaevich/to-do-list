import React, {memo} from 'react';
import {Checkbox} from "./Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton, ListItem} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import {TaskType} from "../AppWithRedux";


type TaskPropsType = {
    changeTaskStatus: (id: string, value: boolean, todolistId: string) => void
    changeTaskTitle:(taskId: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
const Task = memo(({task, removeTask, changeTaskTitle, changeTaskStatus, todolistId}: TaskPropsType) => {
    let {id, title, isDone} = task

    const removeTaskHandler = () => removeTask(id, todolistId)
    const changeStatusHandler = (eventValue: boolean) => changeTaskStatus(id, eventValue, todolistId)
    const changeTaskTitleHandler = (newTitle: string) => changeTaskTitle(id, newTitle, todolistId)

    return (
        <ListItem
            className={isDone ? "is-done" : ""}
            sx={{p: '0'}}
        >
            <Checkbox
                checked={isDone}
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