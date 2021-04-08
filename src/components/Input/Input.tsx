import React, { FC, InputHTMLAttributes, ReactElement } from 'react'
import classNames from 'classnames'
import {IconProp} from '@fortawesome/fontawesome-svg-core'

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepand?: string | ReactElement;
  append?: string | ReactElement;
  className?:string
}

export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepand, append, className, ...restProps } = props
  const realClasses = classNames('input', className, {
    'input-disabled': disabled,
    [`input-${size}`]: size
  })
  return (
    <>
    </>
  )
}