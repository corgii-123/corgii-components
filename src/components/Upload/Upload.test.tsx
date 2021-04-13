import React from 'react'
import { render, RenderResult, fireEvent, waitFor, createEvent } from '@testing-library/react'
import Upload, { UploadProps } from './Upload'
import axios from 'axios'

jest.mock('../Icon/icon', () => {
  return ({ icon, onClick }) => {
    return <span onClick={onClick}>{icon}</span>
  }
})

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fake.url.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  label: 'click upload',
  drag: true
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['forTest'], 'test.jpg', {type: 'image/jpg'})

describe('upload component work well', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps} />)
    fileInput = wrapper.container.querySelector('.corgii-file-input')
    uploadArea = wrapper.container.querySelector('.corgii-upload-drag')
  })
  it('upload process is good', async () => {
    const { queryByText } = wrapper
    mockedAxios.post.mockResolvedValue({'data': 'cool'})
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('test.jpg')).toBeInTheDocument()
    })
    // 图标已经转换为了文字
    expect(queryByText('check-circle')).toBeVisible()
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.jpg'
    }))
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.jpg'
    }))
    expect(queryByText('times')).toBeInTheDocument()
    fireEvent.click(queryByText('times'))
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.jpg'
    }))
    expect(queryByText('test.jpg')).not.toBeInTheDocument()
  })
  it('drag and drop files work well', async () => {
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-drag-over')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-drag-over')
    mockedAxios.post.mockResolvedValue({'data': 'cool'})
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [testFile],
      },
    })
    await waitFor(() => {
      expect(wrapper.queryByText('test.jpg')).toBeInTheDocument()
    })
  })
})