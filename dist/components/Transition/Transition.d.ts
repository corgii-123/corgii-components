import React from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
declare type AnimationName = 'corgii-top' | 'corgii-left' | 'corgii-right' | 'corgii-bottom';
interface AnimationProps {
    animation?: AnimationName;
    wrapper?: boolean;
}
declare type TransitionProps = AnimationProps & CSSTransitionProps;
declare const Transition: React.FC<TransitionProps>;
export default Transition;
