import React from 'react'
import { Story, Meta } from '@storybook/react'
import Input, { InputProps } from './Input'

export default {
  title: 'CorgiiExample/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: '> Input组件📑',
      },
    },
  }
} as Meta

const Template: Story<InputProps> = (args) => <Input {...args} />
export const Basic = Template.bind({})
Basic.args = {

}