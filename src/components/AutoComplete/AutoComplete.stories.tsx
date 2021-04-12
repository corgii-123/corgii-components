import React from 'react'
import { Story, Meta } from '@storybook/react'
import AutoComplete, { AutoCompleteProps } from './AutoComplete'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {action} from '@storybook/addon-actions'

// 引入所有图标
library.add(fas)

export default {
  title: 'CorgiiExample/AutoComplete',
  component: AutoComplete,
  parameters: {
    docs: {
      description: {
        component: '> 联想组件👍',
      },
    },
  }
} as Meta

const Template: Story<AutoCompleteProps> = (args) => {
  const {
    onChange,
    fetchSuggestions,
    ...restProps
  } = args
  const handleChange = (query: string) => {
    if (query) {
      return fetch(`https://api.github.com/search/users?q=${query}`).then(res => res.json()).then(({ items }) => {
        if (items) {
          const res = items.slice(0, 6)
          return res.map((user: { login: string }) => user.login)
        } else {
          return []
        }
      })
    } else {
      return []
    }
  }
  return (
    <AutoComplete placeholder="带有联想功能的输入框" fetchSuggestions={handleChange} {...restProps} />
  )
}
      
export const Auto = Template.bind({})
Auto.args = {
  onSelect: action('select')
}


