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
var updateFileList = function (fileList, updateFile, updateObj) {
    return fileList.map(function (file) {
        if (file.uid === updateFile.uid) {
            return __assign(__assign({}, updateFile), updateObj);
        }
        else {
            return file;
        }
    });
};
export default updateFileList;
