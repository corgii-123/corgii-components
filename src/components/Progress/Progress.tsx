import React, { FC } from 'react'
import { ThemeProps } from '../Icon/Icon'
import classNames from 'classnames'

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme
  } = props
  const realClasses = classNames('progress-inner', {
    [`color-${theme}`]: theme
  })
  return (
    <div className="corgii-progress-bar" style={styles}>
      <div className="progress-outer" style={{ height: `${strokeHeight}px` }}>
        <div
          className={realClasses}
          style={{width: `${percent}%`}}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 20,
  showText: true,
  theme: 'primary'
}

export default Progress