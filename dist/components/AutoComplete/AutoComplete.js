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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import { useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import Icon from '../Icon/Icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    // useRef可以看成是一个变量，用来表示是否需要触发联想
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debouceVal = useDebounce(inputValue, 500);
    useClickOutside(componentRef, function () { setSuggestions([]); });
    var handleChange = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var value;
        return __generator(this, function (_a) {
            value = e.target.value;
            setInputValue(value);
            triggerSearch.current = true;
            return [2 /*return*/];
        });
    }); };
    useEffect(function () {
        if (!triggerSearch.current)
            return;
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        if (!debouceVal) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetchSuggestions(debouceVal)];
                    case 1:
                        results = _a.sent();
                        setSuggestions(results);
                        return [3 /*break*/, 3];
                    case 2:
                        setSuggestions([]);
                        _a.label = 3;
                    case 3:
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [debouceVal, fetchSuggestions]);
    var handleSelect = function (str) {
        setInputValue(str);
        setSuggestions([]);
        if (onSelect) {
            onSelect(str);
        }
        triggerSearch.current = false;
    };
    // 显示dropdown
    var generateDropdown = function () {
        return (_jsx("ul", { children: suggestions.map(function (suggestion, index) {
                return (_jsxs("li", __assign({ onClick: function () { return handleSelect(suggestion); } }, { children: [suggestion, _jsx(Icon, { className: "angle-right", icon: "angle-right" }, void 0)] }), index));
            }) }, void 0));
    };
    return (_jsxs("div", __assign({ className: "corgii-auto-complete", ref: componentRef }, { children: [_jsx(Input, __assign({ value: inputValue, onChange: handleChange }, restProps), void 0),
            loading && _jsx("div", __assign({ className: "spinner" }, { children: _jsx(Icon, { icon: "spinner", spin: true }, void 0) }), void 0), (suggestions.length > 0) && generateDropdown()] }), void 0));
};
AutoComplete.defaultProps = {
    value: ''
};
export default AutoComplete;
