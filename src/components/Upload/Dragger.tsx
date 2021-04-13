import React, { FC, useState } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile: (file: FileList) => void
}

const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  const realClasses = classNames('corgii-upload-drag', {
    'is-drag-over': dragOver
  })
  const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    // 通过datatransfer拿到e中的文件
    onFile(e.dataTransfer.files)
  }
  return (
    <div
      className={realClasses}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger