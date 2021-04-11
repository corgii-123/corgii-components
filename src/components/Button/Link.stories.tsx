import React from 'react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './Button'
import { Story, Meta } from '@storybook/react'

const configParameters = {
  title: 'CorgiiExample/Button',
  component: Button,
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
      control: false
    }
  }
} as Meta

export const Link: Story<ButtonProps> = (args) => {
  const { children, ...restProps } = args
  return (
    <Button {...restProps} btnType={ButtonType.Link} href="https://github.com/corgii-123">
      链接按钮Link
    </Button>
  )
}

export default configParameters
