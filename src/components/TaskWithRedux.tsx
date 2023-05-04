import React, {ChangeEvent, memo} from 'react';
import {Checkbox} from "./Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton, ListItem} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import {TaskType} from "../AppWithRedux";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/task-reducer";


type TaskPropsType = {
    todolistId: string
    task: TaskType
}
const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {
    let {id, title, isDone} = task
    const dispatch = useDispatch()

    const removeTaskHandler = () => dispatch(removeTaskAC(id, todolistId))
    const changeStatusHandler = (e: boolean) => {
        dispatch(changeTaskStatusAC(id, e, todolistId))
    }
    const changeTaskTitleHandler = (newTitle: string) => dispatch(changeTaskTitleAC(id, newTitle, todolistId))

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

export default TaskWithRedux;