import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TaskType} from "../../../../api/task-api";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTask: (todolistId: string, taskId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.todolistId, props.task.id), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.todolistId, props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newValue)
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan changeTitle={onTitleChangeHandler} title={props.task.title}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
