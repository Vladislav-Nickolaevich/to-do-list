import type { Meta, StoryObj } from '@storybook/react';
import {EditableSpan} from "../components/EditableSpan";
import {action} from '@storybook/addon-actions';



const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  tags: ['autodocs'],
  args: {
    title: 'Title',
    changeTitle: action('ChangeTitle')
  },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
  args: {}
}

