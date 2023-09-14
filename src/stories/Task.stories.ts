import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {TaskPriorities, TaskStatuses} from "../api/task-api";
import {Task} from "../features/TodolistsList/Todolist/Task/Task";


const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        changeTaskStatus: action('changedTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        task: {
            id: 'id111', status: TaskStatuses.New, title: 'CSS', addedDate: '', deadline: '',
            description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistId1111'
        },
        todolistId: 'todolistId1111'
    },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDone: Story = {};

export const TaskIsDone: Story = {
    args: {
        task: {
            id: 'id222', status: TaskStatuses.Completed, title: 'HTML', addedDate: '', deadline: '',
            description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistId2222'
        },
        todolistId: 'todolistId2222'
    },
};

