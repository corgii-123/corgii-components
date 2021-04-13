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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import Button, { ButtonType } from '../Button/Button';
import axios from 'axios';
import updateFileList from '../../utils/updateFileList';
import UploadList from './UploadList';
import Dragger from './Dragger';
var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, beforeUpload = props.beforeUpload, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, headers = props.headers, withCredentials = props.withCredentials, name = props.name, data = props.data, accept = props.accept, multiple = props.multiple, drag = props.drag, label = props.label;
    var fileInput = useRef(null);
    var _a = useState([]), fileList = _a[0], setFileList = _a[1];
    var handleClick = function () {
        if (fileInput && fileInput.current) {
            fileInput.current.click();
        }
    };
    var updateFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: 'time_of_upload ' + Date.now(),
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        setFileList(function (preList) {
            return __spreadArrays([_file], preList);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            'headers': __assign({ 'Content-Type': 'multipart/form-data' }, headers),
            withCredentials: withCredentials,
            // 这里是进度信息
            onUploadProgress: function (e) {
                // 为了防止setState中的异步所带来的数据不变化，传入函数可以拿到最新的值
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    setFileList(function (preList) {
                        console.log(preList);
                        return updateFileList(preList, _file, { status: 'uploading', percent: percentage });
                    });
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            }
        }).then(function (res) {
            setFileList(function (preList) {
                console.log(preList);
                return updateFileList(preList, _file, { status: 'success', percent: 100, response: res.data });
            });
            if (onSuccess) {
                onSuccess(res.data, __assign(__assign({}, _file), { status: 'success', percent: 100, response: res.data }));
            }
            if (onChange) {
                onChange(__assign(__assign({}, _file), { status: 'success', percent: 100, response: res.data }));
            }
        }).catch(function (err) {
            setFileList(function (preList) {
                console.log(preList);
                return updateFileList(preList, _file, { status: 'error', response: err });
            });
            if (onError) {
                onError(err, __assign(__assign({}, _file), { status: 'error', response: err }));
            }
            if (onChange) {
                onChange(__assign(__assign({}, _file), { status: 'error', response: err }));
            }
        });
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (files) {
            updateFiles(files);
        }
    };
    console.log(fileList);
    var handleRemove = function (_file) {
        setFileList(function (preList) {
            return preList.filter(function (pre) {
                return pre.uid !== _file.uid;
            });
        });
        if (onRemove) {
            onRemove(_file);
        }
    };
    return (_jsxs("div", __assign({ className: "corgii-upload-component" }, { children: [_jsx(Button, __assign({ btnType: ButtonType.Primary, onClick: handleClick }, { children: label || '上传文件' }), void 0),
            drag ? _jsx(Dragger, __assign({ onFile: function (files) { return updateFiles(files); } }, { children: label }), void 0) : '',
            _jsx("input", { type: "file", className: "corgii-file-input", style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, accept: accept, multiple: multiple }, void 0),
            _jsx(UploadList, { fileList: fileList, onRemove: handleRemove }, void 0)] }), void 0));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
