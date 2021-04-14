import React from 'react'
import { Story, Meta } from '@storybook/react'
import Progress, { ProgressProps } from './Progress'

export default {
  title: 'CorgiiExample/Porgress',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: '> Progress组件📏',
      },
    },
  }
} as Meta

const Template: Story<ProgressProps> = (args) => <Progress {...args} />
export const Primary = Template.bind({})
Primary.args = {
  percent: 40,
  theme: "primary"
}