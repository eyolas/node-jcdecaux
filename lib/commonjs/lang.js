"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if value is classified as a String primitive or object.
 * @param  {any}     obj [description]
 * @return {boolean}     [description]
 */
function isString(obj) {
    return typeof obj === "string";
}
exports.isString = isString;
function isTringBlank(obj) {
    if (!isString(obj)) {
        return true;
    }
    return (!obj || /^\s*$/.test(obj));
}
exports.isTringBlank = isTringBlank;
;
function isBlank(obj) {
    return obj === undefined || obj === null;
}
exports.isBlank = isBlank;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isValidUrl(obj) {
    return !isTringBlank(obj);
}
exports.isValidUrl = isValidUrl;
//# sourceMappingURL=lang.js.map