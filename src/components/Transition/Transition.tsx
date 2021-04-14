import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'corgii-top' | 'corgii-left' | 'corgii-right' | 'corgii-bottom'

interface AnimationProps {
  animation?: AnimationName,
  wrapper?: boolean,
  in: boolean,
  timeout: number
}

type TransitionProps = AnimationProps & Omit<CSSTransitionProps<HTMLElement>, 'in' | 'timeout'>

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    animation,
    classNames,
    children,
    wrapper,
    ...restProps
  } = props
  // 利用transition不能继承所以wrapper防止与子元素的transition冲突
  return (
    <CSSTransition classNames={classNames || animation} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition