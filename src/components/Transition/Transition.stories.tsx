import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import Transition from './Transition'
import { TransitionProps } from 'react-transition-group/Transition'

export default {
  title: 'CorgiiExample/Transition',
  component: Transition,
  parameters: {
    docs: {
      description: {
        component: '> Transition组件🌊',
      },
    },
  },
  argTypes: {
    in: {
      control: {
        type: 'boolean'
      }
    },
    timeout: {
      control: {
        type: 'number'
      }
    }
  }
} as Meta

const Template: Story<TransitionProps> = (args) => {
  const {
    timeout,
    in: show,
    ...restProps
  } = args
  const [isShow, setIsShow] = useState<boolean>(false)
  const timer = setTimeout(() => {
    setIsShow(true)
    clearTimeout(timer)
  }, 500)
  return (
    <Transition in={!isShow ? isShow : show as boolean} timeout={timeout as number} {...restProps}>
      <p>这是一段具有动画文字</p>
    </Transition>
  )
}

export const Example = Template.bind({})
Example.args = {
  timeout: 300,
  animation: 'corgii-bottom',
  in: true
}

