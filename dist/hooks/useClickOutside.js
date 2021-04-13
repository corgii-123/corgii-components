import { useEffect } from 'react';
var useClickOutSide = function (ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current) {
                return;
            }
            handler(event);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
};
export default useClickOutSide;
