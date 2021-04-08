import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'corgii-top' | 'corgii-left' | 'corgii-right' | 'corgii-bottom'

interface AnimationProps {
  animation?: AnimationName,
  wrapper?: boolean
}

type TransitionProps = AnimationProps & CSSTransitionProps

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    animation,
    classNames,
    children,
    wrapper,
    ...restProps
  } = props
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