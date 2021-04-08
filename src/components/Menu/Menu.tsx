import React, {useState} from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './MenuItem'

export type MenuMode = 'vertical' | 'horizental'
export type SelectFun = (selectedIndex: string) => void
export interface MenuProps {
  mode?: MenuMode;
  defaultIndex?: string;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: SelectFun;
}
interface IMenuProps {
  index: string;
  onSelect?: SelectFun;
  mode?:'vertical' | 'horizental'
}

export const MenuContext = React.createContext<IMenuProps>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
  const { mode, defaultIndex, className, style, children, onSelect } = props
  const [currentIndex, setCurrentIndex] = useState<string>(defaultIndex as string)
  const realClasses = classNames('menu', className, `menu-${mode}`)
  const handleSelect = (selectedIndex: string) => {
    setCurrentIndex(selectedIndex)
    if (onSelect) {
      onSelect(selectedIndex)
    }
  }
  const contextMenuProps = {
    index: currentIndex,
    onSelect: handleSelect,
    mode
  }
  const generateItem = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const {displayName} = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {index: String(index)})
      } else {
        console.warn('There is an item which is not MenuItem')
      }
    })
  }
  return (
    <MenuContext.Provider value={contextMenuProps}>
      <ul style={style} className={realClasses} data-testid="test-menu">
        {generateItem()}
      </ul>
    </MenuContext.Provider>
  )
}

Menu.defaultProps = {
  mode: 'horizental',
  defaultIndex: '0'
}

export default Menu