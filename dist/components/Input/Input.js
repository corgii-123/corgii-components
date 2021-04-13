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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import Icon from '../Icon/Icon';
var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, className = props.className, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "className"]);
    var realClasses = classNames('corgii-input', className, (_a = {
            'is-disabled': disabled
        },
        _a["input-" + size] = size,
        _a));
    return (_jsxs("div", __assign({ className: "corgii-input-wrap" }, { children: [prepend && _jsx("span", __assign({ className: "prepend input-group " + (size && "input-group-" + size) }, { children: prepend }), void 0),
            _jsx("input", __assign({ className: realClasses, disabled: disabled }, restProps), void 0),
            !!icon && _jsx(Icon, { icon: icon }, void 0),
            append && _jsx("span", __assign({ className: "append input-group " + (size && "input-group-" + size) }, { children: append }), void 0)] }), void 0));
};
Input.defaultProps = {
    disabled: false,
};
export default Input;
