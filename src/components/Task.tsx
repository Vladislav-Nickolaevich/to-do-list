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

    const removeTaskHandler = () => removeTask(task.id)
    const changeStatusHandler = (eventValue: boolean) => changeTaskStatus(task.id, eventValue)
    const changeTaskTitleHandler = (newTitle: string) => changeTaskTitle(task.id, newTitle)

    return (
        <ListItem
            className={task.isDone ? "is-done" : ""}
            sx={{p: '0'}}
        >
            <Checkbox
                checked={task.isDone}
                callBack={changeStatusHandler}
            />
            <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
            <IconButton
                size='small'
                onClick={removeTaskHandler}>
                <CancelPresentationIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    );
})

export default Task;