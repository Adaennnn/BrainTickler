import DOMPurify from "dompurify";

/**
 * Shuffles an array using the Fisher-Yates shuffle algorithm and returns a new array.
 * @param {Array} array - The array to shuffle.
 * @return {Array} A new array that is a shuffled version of the input array.
 */
function shuffle(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

/**
 * Builds an object with keys composed of a base key and index, all set to undefined values.
 * @param {Number} length - The number of keys to generate.
 * @param {String} key - The base key to be used.
 * @return {Object} A new object with undefined keys.
 */
function buildUndefinedKeysObject(length, key) {
    const obj = {}
    for (let i = 1; i <= length; i++) {
        obj[`${key}${i}`] = undefined;
    }
    return obj;
}

/**
 * Sanitizes an array of objects, ensuring that all strings are safe from XSS attacks.
 * Returns a new array with sanitized objects.
 * @param {Array} arr - The array containing objects to sanitize.
 * @return {Array} A new array with sanitized objects.
 */
function sanitize(arr) {
    return arr.map(obj => {
        const newObj = {};
        for (let key in obj) {
            if (Array.isArray(obj[key])) {
                newObj[key] = obj[key].map(str => DOMPurify.sanitize(str));
            } else if (typeof obj[key] === "string") {
                newObj[key] = DOMPurify.sanitize(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        }
        return newObj;
    });
}

export {shuffle, buildUndefinedKeysObject, sanitize}
