import type {Meta, StoryObj} from '@storybook/react';
import TaskWithRedux from "../components/TaskWithRedux";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import React from 'react';
import {TaskType} from "../AppWithRedux";
import Task from "../components/Task";


const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLIST/TaskWithRedux',
    component: TaskWithRedux,
    tags: ['autodocs'],
    args: {
        task: {id: '112233', title: "Auto", isDone: false},
        todolistId: 'todolistID2'
    },
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

const TaskCopy = () => {
    const task = useSelector<AppRootState, TaskType>(state => state.tasks['todolistID2'][2])
    return <TaskWithRedux task={task} todolistId={'todolistID2'}/>
}
export const TaskWithReduxStory: Story = {
    render: () => <TaskCopy/>
};



