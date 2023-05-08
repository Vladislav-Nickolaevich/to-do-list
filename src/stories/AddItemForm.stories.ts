import type { Meta, StoryObj } from '@storybook/react';

import { AddItemForm } from '../components/AddItemForm';

const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  tags: ['autodocs'],
  argTypes: {
    addTask: {
      description: 'Button clicked inside form',
      action: 'clicked'
    }
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
};




