import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onMouseOver?: (e: React.MouseEvent) => void;
  children: React.ReactNode
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const context = useContext(MenuContext)
  const { index, children, disabled, className, style } = props
  const realClasses = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': index === context.index
  })
  const handleSelect = () => {
    if (!disabled && context.onSelect) {
      context.onSelect(index as string)
    }
  }
  return (
    <li style={style} className={realClasses} onClick={handleSelect}>
      {children}
    </li>
  )
}

// 添加标记
MenuItem.displayName = 'MenuItem'

export default MenuItem