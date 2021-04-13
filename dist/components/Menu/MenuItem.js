var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';
var MenuItem = function (props) {
    var context = useContext(MenuContext);
    var index = props.index, children = props.children, disabled = props.disabled, className = props.className, style = props.style;
    var realClasses = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': index === context.index
    });
    var handleSelect = function () {
        if (!disabled && context.onSelect) {
            context.onSelect(index);
        }
    };
    return (_jsx("li", __assign({ style: style, className: realClasses, onClick: handleSelect }, { children: children }), void 0));
};
// 添加标记
MenuItem.displayName = 'MenuItem';
export default MenuItem;
