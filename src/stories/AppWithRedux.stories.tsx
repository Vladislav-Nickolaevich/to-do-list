import type { Meta, StoryObj } from '@storybook/react';
import AppWithRedux from "../app/AppWithRedux";
import React from 'react';
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

const meta: Meta<typeof AppWithRedux> = {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {
  render: () => <AppWithRedux/>
};
