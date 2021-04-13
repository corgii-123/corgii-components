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
import { useState } from 'react';
import classNames from 'classnames';
var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var realClasses = classNames('corgii-upload-drag', {
        'is-drag-over': dragOver
    });
    var handleDrag = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        // 通过datatransfer拿到e中的文件
        onFile(e.dataTransfer.files);
    };
    return (_jsx("div", __assign({ className: realClasses, onDragOver: function (e) { return handleDrag(e, true); }, onDragLeave: function (e) { return handleDrag(e, false); }, onDrop: handleDrop }, { children: children }), void 0));
};
export default Dragger;
