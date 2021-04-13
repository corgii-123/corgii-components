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
import classNames from 'classnames';
var Progress = function (props) {
    var _a;
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    var realClasses = classNames('progress-inner', (_a = {},
        _a["color-" + theme] = theme,
        _a));
    return (_jsx("div", __assign({ className: "corgii-progress-bar", style: styles }, { children: _jsx("div", __assign({ className: "progress-outer", style: { height: strokeHeight + "px" } }, { children: _jsx("div", __assign({ className: realClasses, style: { width: percent + "%" } }, { children: showText && _jsx("span", __assign({ className: "inner-text" }, { children: percent + "%" }), void 0) }), void 0) }), void 0) }), void 0));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
};
export default Progress;
