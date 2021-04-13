import React from 'react';
export declare type MenuMode = 'vertical' | 'horizental';
export declare type SelectFun = (selectedIndex: string) => void;
export interface MenuProps {
    mode?: MenuMode;
    defaultIndex?: string;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: SelectFun;
}
interface IMenuProps {
    index: string;
    onSelect?: SelectFun;
    mode?: 'vertical' | 'horizental';
}
export declare const MenuContext: React.Context<IMenuProps>;
declare const Menu: React.FC<MenuProps>;
export default Menu;
