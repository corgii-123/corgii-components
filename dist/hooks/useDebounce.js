import { useEffect, useState } from 'react';
var useDebounce = function (value, ms) {
    if (ms === void 0) { ms = 300; }
    var _a = useState(value), debounceVal = _a[0], setDebounceVal = _a[1];
    useEffect(function () {
        var timer = setTimeout(function () {
            setDebounceVal(value);
        }, ms);
        return function () {
            clearTimeout(timer);
        };
    }, [value, ms]);
    return debounceVal;
};
export default useDebounce;
