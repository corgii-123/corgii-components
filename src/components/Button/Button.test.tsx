import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, {ButtonSize, ButtonType} from './Button'

const defaultProps = {
  onClick:jest.fn()
}
const testProps = {
  size: ButtonSize.Large,
  btnType: ButtonType.Danger,
  className: 'aabb'
}
const disabledProps = {
  disabled: true,
  onClick:jest.fn()
}

// describe关键字进行分类
describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.queryByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.queryByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-danger aabb btn-lg')
  })
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href="123">Link</Button>)
    const element = wrapper.queryByText('Link') as HTMLElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-link')
    expect(element.tagName).toEqual('A')
  })
  it('should render the disabled button which is disabled', () => {
    const wrapper = render(<Button {...disabledProps}>Disabled</Button>)
    const element = wrapper.queryByText('Disabled') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})