import React, { FC } from 'react'
import { UploadFile } from './Upload'
import Icon from '../Icon/Icon'
import Progress from '../Progress/Progress'

interface UploadlistProps {
  fileList: UploadFile[],
  onRemove: (file: UploadFile) => void
}

const UploadList: FC<UploadlistProps> = (props) => {
  const {
    fileList,
    onRemove
  } = props

  return (
    <ul className="corgii-upload-list">
      {fileList.map((_file) => {
        return (
          <li className="corgii-upload-list-item" key={_file.uid}>
            <span className={`file-name file-${_file.status}`}>
              <Icon icon="file" theme="secondary" />
              {' ' + _file.name + ' '}
            </span>
            <span className="file-status">
              {(_file.status === 'uploading' || _file.status === 'ready') && <Icon icon="spinner" spin theme="info" />}
              {_file.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {_file.status === 'error' && <Icon icon="times-circle" theme="warning" /> }
            </span>
            <span className="file-close" onClick={() => onRemove(_file)}>
              <Icon icon="times"></Icon>
            </span>
            {_file.status === 'uploading' && <Progress percent={_file.percent || 0} />}
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList