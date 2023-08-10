import React, {memo} from 'react';
import {Checkbox} from "./Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton, ListItem} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import {changeTaskStatusAC, changeTaskTitleAC,  removeTaskTC} from "../state/task-reducer";
import {TaskStatuses, TaskType} from "../api/task-api";
import {useAppDispatch} from "../state/store";


type TaskPropsType = {
    todolistId: string
    task: TaskType
}
const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {
    let {id, title, status} = task
    const dispatch = useAppDispatch()

    const removeTaskHandler = () => dispatch(removeTaskTC(todolistId, id))
    const changeStatusHandler = (value: boolean) => {
        dispatch(changeTaskStatusAC(id, value? TaskStatuses.Completed: TaskStatuses.New, todolistId))
    }
    const changeTaskTitleHandler = (newTitle: string) => dispatch(changeTaskTitleAC(id, newTitle, todolistId))

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

export default TaskWithRedux;