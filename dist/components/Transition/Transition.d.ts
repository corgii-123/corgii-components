import React from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
declare type AnimationName = 'corgii-top' | 'corgii-left' | 'corgii-right' | 'corgii-bottom';
interface AnimationProps {
    animation?: AnimationName;
    wrapper?: boolean;
    in: boolean;
    timeout: number;
}
declare type TransitionProps = AnimationProps & Omit<CSSTransitionProps<HTMLElement>, 'in' | 'timeout'>;
declare const Transition: React.FC<TransitionProps>;
export default Transition;
