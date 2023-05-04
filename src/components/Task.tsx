import React, {memo} from 'react';
import {Checkbox} from "./Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton, ListItem} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import {TaskType} from "../AppWithRedux";


type TaskPropsType = {
    changeTaskStatus: (id: string, value: boolean) => void
    changeTaskTitle:(taskId: string, title: string) => void
    removeTask: (taskId: string) => void
    task: TaskType
}
const Task = memo(({task, removeTask, changeTaskTitle, changeTaskStatus}: TaskPropsType) => {
    let {id, title, isDone} = task

    const removeTaskHandler = () => removeTask(id)
    const changeStatusHandler = (eventValue: boolean) => changeTaskStatus(id, eventValue)
    const changeTaskTitleHandler = (newTitle: string) => changeTaskTitle(id, newTitle)

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