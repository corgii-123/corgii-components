import React from 'react';
export declare enum ButtonSize {
    Large = "lg",
    Small = "sm"
}
export declare enum ButtonType {
    Primary = "primary",
    Danger = "danger",
    Default = "default",
    Link = "link"
}
interface BaseButtonProps {
    size?: ButtonSize;
    className?: string;
    disabled?: boolean;
    btnType?: ButtonType;
    children?: React.ReactNode;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
declare const Button: React.FC<ButtonProps>;
export default Button;
