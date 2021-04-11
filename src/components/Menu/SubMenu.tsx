import React,{cloneElement, useContext, useEffect, useState} from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'
import Icon from '../Icon/Icon'
import Transition from '../Transition/Transition'

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { index, title, className, children } = props
  const context = useContext(MenuContext)
  const realClasses = classNames('menu-item submenu-item', className, {
    'is-active': index === context.index
  })
  useEffect(() => {
      setIsVisible(index === context.index)
  }, [index, context.index])
  const renderChidlren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return cloneElement(childElement, {index: `${index}-${i}`})
      } else {
        console.warn('There is an item which is not MenuItem')
      }
    })
    const subMenuClasses = classNames('submenu', {
      'is-visible': index === context.index
    })
    return (
      <Transition
        in={isVisible}
        timeout={300}
        animation="corgii-top"
      >
        <ul className={`${subMenuClasses}`}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }
  const verticalFormate = {
    onClick: (e: React.MouseEvent) => {
      e.preventDefault()
      if (context.onSelect) {
        context.onSelect(index as string)
      }
    },
    onMouseEnter: (e: React.MouseEvent)=> {
      if (context.mode === 'vertical') return
      setIsVisible(true)
    },
    onMouseLeave: (e: React.MouseEvent)=> {
      if (context.mode === 'vertical') return
      setIsVisible(false)
    }
  }
  return (
    <li className={realClasses} {...verticalFormate}>
      <div className="submenu-title">
        {title}
        <Icon icon="caret-down" theme="secondary"/>
      </div>
      {renderChidlren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu