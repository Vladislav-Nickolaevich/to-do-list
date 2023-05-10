import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Task from '../components/Task';


const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        changeTaskStatus: action('changedTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        task: {id: 'id111', isDone: false, title: 'CSS'},
        todolistId: 'todolistId1111'
    },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDone: Story = {};

export const TaskIsDone: Story = {
    args: {
        task: {id: 'id222', isDone: true, title: 'HTML'},
        todolistId: 'todolistId2222'
    },
};

