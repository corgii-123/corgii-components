import React, { ChangeEvent, FC, InputHTMLAttributes, ReactElement } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/Icon'

type InputSize = 'lg' | 'sm'
// Omit忽略某一个值
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  className?: string;
  onchange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, className, ...restProps } = props
  const realClasses = classNames('corgii-input', className, {
    'is-disabled': disabled,
    [`input-${size}`]: size
  })
  return (
    <div className="corgii-input-wrap">
      {prepend && <span className={`prepend input-group ${size && `input-group-${size}`}`}>{prepend}</span>}
      <input className={realClasses} disabled={disabled} {...restProps} />
      {!!icon && <Icon icon={icon} />}
      {append && <span className={`append input-group ${size && `input-group-${size}`}`}>{append}</span>}
    </div>
  )
}

Input.defaultProps = {
  disabled: false,
}

export default Input