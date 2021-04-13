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
import Icon from '../Icon/Icon';
import Progress from '../Progress/Progress';
var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (_jsx("ul", __assign({ className: "corgii-upload-list" }, { children: fileList.map(function (_file) {
            return (_jsxs("li", __assign({ className: "corgii-upload-list-item" }, { children: [_jsxs("span", __assign({ className: "file-name file-" + _file.status }, { children: [_jsx(Icon, { icon: "file", theme: "secondary" }, void 0), ' ' + _file.name + ' '] }), void 0),
                    _jsxs("span", __assign({ className: "file-status" }, { children: [(_file.status === 'uploading' || _file.status === 'ready') && _jsx(Icon, { icon: "spinner", spin: true, theme: "info" }, void 0),
                            _file.status === 'success' && _jsx(Icon, { icon: "check-circle", theme: "success" }, void 0),
                            _file.status === 'error' && _jsx(Icon, { icon: "times-circle", theme: "warning" }, void 0)] }), void 0),
                    _jsx("span", __assign({ className: "file-close", onClick: function () { return onRemove(_file); } }, { children: _jsx(Icon, { icon: "times" }, void 0) }), void 0),
                    _file.status === 'uploading' && _jsx(Progress, { percent: _file.percent || 0 }, void 0)] }), _file.uid));
        }) }), void 0));
};
export default UploadList;
