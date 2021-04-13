import React from 'react'
import { Story, Meta } from '@storybook/react'
import Upload, { UploadProps } from './Upload'
import {action} from '@storybook/addon-actions'

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    console.log('请小于50k');
    return false
  } else {
    return true
  }
}
// 修改文件信息
const filePromise = (file: File) => {
  // 实例化File对象
  const newFile = new File([file], `corgii-${file.name}`, {type: file.type})
  return Promise.resolve(newFile)
}

export default {
  title: 'CorgiiExample/Upload',
  component: Upload,
  parameters: {
    docs: {
      description: {
        component: '> 上传组件📂',
      },
    },
  }
} as Meta

const Template: Story<UploadProps> = (args) => <Upload {...args} />

export const FileInput = Template.bind({})
FileInput.args = {
  action: 'https://jsonplaceholder.typicode.com/posts',
  onProgress: action('progress'),
  onSuccess: action('success'),
  onError: action('error'),
  onChange: action('change'),
  beforeUpload: filePromise,
  name: 'corgiiFile',
  data: { 'key': 'value' },
  headers: { 'X-Power-By': 'corgii' },
  accept: '.jpg',
  multiple: true,
  drag: true,
  label: '📂请上传文件'
}