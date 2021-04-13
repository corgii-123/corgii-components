import React, { FC } from 'react';
import { ThemeProps } from '../Icon/Icon';
export interface ProgresssProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
declare const Progress: FC<ProgresssProps>;
export default Progress;
