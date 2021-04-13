import React from 'react'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import AutoComplete, { AutoCompleteProps } from './AutoComplete'
import '@testing-library/jest-dom/extend-expect';

const testArray = [
  { value: 'ab', number: 1 },
  { value: 'abc', number: 2 },
  { value: 'b', number: 3 },
  {value: 'c', number: 14}
]
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query: string) => {
    let test = testArray.filter(item => item.value.includes(query))
    return test.map(item => item.value)
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}
let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic behavior', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    expect(wrapper.container.querySelectorAll('li').length).toEqual(2)
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith('ab')
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('ab')
  })
  it('click outside would hide dropdown', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
})