"use strict";
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
exports.__esModule = true;
exports.API = void 0;
var axios_1 = require("axios");
function normalizeProps(input) {
    return typeof input === 'string'
        ? { baseURL: input }
        : input;
}
var API = /** @class */ (function () {
    function API(props) {
        props = normalizeProps(props);
        this.baseURL = props.baseURL || '';
    }
    API.prototype.sendRequest = function (options) {
        var mergedOptions = __assign({ method: 'get', withCredentials: true }, options);
        mergedOptions.headers = mergedOptions.headers || {};
        mergedOptions.url = "".concat(this.baseURL).concat(options.url);
        if (mergedOptions.method &&
            ['get', 'delete'].includes(mergedOptions.method) &&
            Object.prototype.hasOwnProperty.call(mergedOptions, 'data')) {
            mergedOptions.params = options.data;
            delete mergedOptions.data;
        }
        return (0, axios_1["default"])(mergedOptions)
            .then(function (res) { return res.data; })["catch"](function (err) {
            throw err;
        });
    };
    return API;
}());
exports.API = API;
