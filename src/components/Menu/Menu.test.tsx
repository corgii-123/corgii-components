import React, { DOMElement } from 'react'
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, RenderResult,cleanup } from '@testing-library/react'
import Menu, {MenuProps, MenuMode} from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

const testProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}
const testVerProps:{mode: MenuMode} = {
  mode: 'vertical'
}
const GenerateMenu = (props:MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        third
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop  
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement:HTMLElement
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(GenerateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('shoule render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('is-active')
    expect(disabledElement).toHaveClass('is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('third')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapperVer = render(GenerateMenu(testVerProps))
    const element = wrapperVer.getByTestId('test-menu')
    expect(element).toHaveClass('menu-vertical')
  })
  it('dropdown test', () => {
    const dropdownElement = menuElement.querySelectorAll(':scope > li')[3]
    fireEvent.mouseEnter(dropdownElement)
    expect(wrapper.getByText('drop')).toBeVisible()
    fireEvent.click(wrapper.getByText('drop'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
  })
})