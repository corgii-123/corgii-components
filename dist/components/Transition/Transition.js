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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
var Transition = function (props) {
    var animation = props.animation, classNames = props.classNames, children = props.children, wrapper = props.wrapper, restProps = __rest(props
    // 利用transition不能继承所以wrapper防止与子元素的transition冲突
    , ["animation", "classNames", "children", "wrapper"]);
    // 利用transition不能继承所以wrapper防止与子元素的transition冲突
    return (_jsx(CSSTransition, __assign({ classNames: classNames || animation }, restProps, { children: wrapper ? _jsx("div", { children: children }, void 0) : children }), void 0));
};
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
};
export default Transition;
