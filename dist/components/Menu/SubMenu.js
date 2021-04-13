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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { cloneElement, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';
import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';
var SubMenu = function (props) {
    var _a = useState(false), isVisible = _a[0], setIsVisible = _a[1];
    var index = props.index, title = props.title, className = props.className, children = props.children;
    var context = useContext(MenuContext);
    var realClasses = classNames('menu-item submenu-item', className, {
        'is-active': index === context.index
    });
    useEffect(function () {
        setIsVisible(index === context.index);
    }, [index, context.index]);
    var renderChidlren = function () {
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return cloneElement(childElement, { index: index + "-" + i });
            }
            else {
                console.warn('There is an item which is not MenuItem');
            }
        });
        var subMenuClasses = classNames('submenu', {
            'is-visible': index === context.index
        });
        return (_jsx(Transition, __assign({ in: isVisible, timeout: 300, animation: "corgii-top" }, { children: _jsx("ul", __assign({ className: "" + subMenuClasses }, { children: childrenComponent }), void 0) }), void 0));
    };
    var verticalFormate = {
        onClick: function (e) {
            e.preventDefault();
            if (context.onSelect) {
                context.onSelect(index);
            }
        },
        onMouseEnter: function (e) {
            if (context.mode === 'vertical')
                return;
            setIsVisible(true);
        },
        onMouseLeave: function (e) {
            if (context.mode === 'vertical')
                return;
            setIsVisible(false);
        }
    };
    return (_jsxs("li", __assign({ className: realClasses }, verticalFormate, { children: [_jsxs("div", __assign({ className: "submenu-title" }, { children: [title, _jsx(Icon, { icon: "caret-down", theme: "secondary" }, void 0)] }), void 0), renderChidlren()] }), void 0));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
