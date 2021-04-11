import React from 'react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './Button'
import { Story, Meta } from '@storybook/react'

const configParameters = {
  title: 'CorgiiExample/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: '> 按钮组件🔘',
      },
    },
  },
  argTypes: {
    size: {
      options: [ButtonSize.Large, ButtonSize.Small, ''],
      control: {
        type: 'radio',
        labels: {
          [ButtonSize.Large]: 'large',
          [ButtonSize.Small]: 'small',
          '': 'default'
        }
      }
    },
    btnType: {
      options: [ButtonType.Primary, ButtonType.Danger, ButtonType.Default],
      control: {
        type: 'select',
        labels: {
          [ButtonType.Primary]: 'primary',
          [ButtonType.Danger]: 'danger',
          [ButtonType.Default]: 'default',
        }
      }
    },
    onClick: { action: 'clicked' } 
  }
} as Meta

const Template: Story<ButtonProps> = (args) => {
  const { children, ...restProps } = args
  return (
    <Button {...restProps}>
      {children}
    </Button>
  )
}

export const Size = Template.bind({})
Size.args = {
  children: '可调节大小Size',
  size: undefined
}

export const Type = Template.bind({})
Type.args = {
  children: '调节不同类型Type',
  btnType: ButtonType.Primary
}

export default configParameters
