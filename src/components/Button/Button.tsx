import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Danger = 'danger',
  Default = 'default',
  Link = 'link'
}

interface BaseButtonProps {
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  btnType?: ButtonType;
  children?: React.ReactNode;
  href?: string
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const {
    size,
    className,
    disabled,
    btnType,
    children,
    href,
    ...restProps
  } = props
  const realClasses = classNames('btn',className, {
    [`btn-${size}`]: size,
    [`btn-${btnType}`]: btnType,
    'disabled': (btnType === ButtonType.Link) && disabled
  })
  if (btnType === ButtonType.Link && href) {
    return (
      <a
        className={realClasses}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={realClasses}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button