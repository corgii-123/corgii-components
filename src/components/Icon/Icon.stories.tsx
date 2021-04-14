import React from 'react'
import { Story, Meta } from '@storybook/react'
import Icon, { IconProps } from './Icon'

export default {
  title: 'CorgiiExample/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: '> Icon组件😮',
      },
    },
  }
} as Meta

const Template: Story<IconProps> = (args) => <Icon {...args} />
export const Font = Template.bind({})
Font.args = {
  icon: 'rocket',
  theme: 'primary',
  size: 'lg'
}