import React from 'react';
export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onMouseOver?: (e: React.MouseEvent) => void;
    children: React.ReactNode;
}
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
