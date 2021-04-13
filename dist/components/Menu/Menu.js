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
import React, { useState } from 'react';
import classNames from 'classnames';
export var MenuContext = React.createContext({ index: '0' });
var Menu = function (props) {
    var mode = props.mode, defaultIndex = props.defaultIndex, className = props.className, style = props.style, children = props.children, onSelect = props.onSelect;
    var _a = useState(defaultIndex), currentIndex = _a[0], setCurrentIndex = _a[1];
    var realClasses = classNames('menu', className, "menu-" + mode);
    var handleSelect = function (selectedIndex) {
        setCurrentIndex(selectedIndex);
        if (onSelect) {
            onSelect(selectedIndex);
        }
    };
    var contextMenuProps = {
        index: currentIndex,
        onSelect: handleSelect,
        mode: mode
    };
    var generateItem = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: String(index) });
            }
            else {
                console.warn('There is an item which is not MenuItem');
            }
        });
    };
    return (_jsx(MenuContext.Provider, __assign({ value: contextMenuProps }, { children: _jsx("ul", __assign({ style: style, className: realClasses, "data-testid": "test-menu" }, { children: generateItem() }), void 0) }), void 0));
};
Menu.defaultProps = {
    mode: 'horizental',
    defaultIndex: '0'
};
export default Menu;
