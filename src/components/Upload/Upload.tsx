import React, { ChangeEvent, FC, useRef, useState } from 'react'
import Button, { ButtonType } from '../Button/Button'
import axios from 'axios'
import updateFileList from '../../utils/updateFileList'
import UploadList from './UploadList'
import Dragger from './Dragger'

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: 'ready' | 'uploading' | 'success' | 'error';
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

// 需要暴露出生命周期函数
export interface UploadProps {
  action: string;
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: UploadFile) => void
  onSuccess?: (data: any, file: UploadFile) => void
  onError?: (data: any, file: UploadFile) => void
  onChange?: (file: UploadFile) => void
  onRemove?: (file: UploadFile) => void
  headers?: { [key: string]: any }
  name?: string
  data?: { [key: string]: any }
  withCredentials?: boolean
  accept?: string
  multiple?: boolean
  drag?: boolean
  label?: string
}

const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    beforeUpload,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    withCredentials,
    name,
    data,
    accept,
    multiple,
    drag,
    label
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<Array<UploadFile>>([])
  const handleClick = () => {
    if (fileInput && fileInput.current) {
      fileInput.current.click()
    }
  }
  const updateFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result) {
          post(file)
        }
      }
    })
  }
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: 'time_of_upload ' + Date.now(),
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    setFileList(preList => {
      return [_file, ...preList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      'headers': {
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
      withCredentials,
      // 这里是进度信息
      onUploadProgress(e: any) {
        // 为了防止setState中的异步所带来的数据不变化，传入函数可以拿到最新的值
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          setFileList(preList => {
            console.log(preList)
            return updateFileList(preList, _file, {status: 'uploading', percent: percentage})
          })
          if (onProgress) {
            onProgress(percentage, _file)
          }
        }
      }
    }).then(res => {
      setFileList(preList => {
        console.log(preList)
        return updateFileList(preList, _file, {status: 'success', percent: 100, response: res.data})
      })
      if (onSuccess) {
        onSuccess(res.data, {..._file, status: 'success', percent: 100, response: res.data })
      }
      if (onChange) {
        onChange( {..._file, status: 'success', percent: 100, response: res.data })
      }
    }).catch(err => {
      setFileList(preList => {
        console.log(preList)
        return updateFileList(preList, _file, {status: 'error', response: err})
      })
      if (onError) {
        onError(err, {..._file, status: 'error', response: err })
      }
      if (onChange) {
        onChange({..._file, status: 'error', response: err })
      }
    })
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(files) {
      updateFiles(files)
    }
  }
  console.log(fileList)
  const handleRemove = (_file: UploadFile) => {
    setFileList((preList) => {
      return preList.filter((pre) => {
        return pre.uid !== _file.uid
      })
    })
    if (onRemove) {
      onRemove(_file)
    }
  }
  return (
    <div className="corgii-upload-component">
      <Button
        btnType={ButtonType.Primary}
        onClick={handleClick}
      >
        {label || '上传文件'}
      </Button>
      {drag ? <Dragger onFile={(files) => updateFiles(files)}>{label}</Dragger> : ''}
      <input
        type="file"
        className="corgii-file-input"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload