import type { Meta, StoryObj } from '@storybook/react';
import App from "../app/App";
import React from 'react';
import {ReduxStoreProviderDecorator} from "../app/ReduxStoreProviderDecorator";

const meta: Meta<typeof App> = {
  title: 'TODOLIST/App',
  component: App,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppWithReduxStory: Story = {
  render: () => <App/>
};
