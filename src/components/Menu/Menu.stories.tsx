import React from 'react'
import { Story, Meta } from '@storybook/react'
import Menu, { MenuProps } from './Menu'
import SubMenu from './SubMenu'
import MenuItem from './MenuItem'
import {action} from '@storybook/addon-actions'

export default {
  title: 'CorgiiExample/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component: '> Menu组件📚',
      },
    },
  },
  argTypes: {
    mode: {
      options: ['vertical', 'horizental'],
      control: {
        type: 'select'
      }
    }
  }
} as Meta

const Template: Story<MenuProps> = (args) => (
  <Menu {...args}>
    <MenuItem>item-1</MenuItem>
    <MenuItem disabled>item-2</MenuItem>
    <MenuItem>item-3</MenuItem>
    <SubMenu title="sub-menu">
      <MenuItem>sub-item-1</MenuItem>
      <MenuItem>sub-item-2</MenuItem>
      <MenuItem>sub-item-3</MenuItem>
    </SubMenu>
  </Menu>
)

export const Example = Template.bind({})
Example.args = {
  mode: 'horizental',
  onSelect: action('onSelect')
}