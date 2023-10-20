import DOMPurify from "dompurify";

/**
 * Shuffles an array in place using Fisher-Yates shuffle algorithm.
 * @param {Array} array - The array to shuffle.
 * @return {Array} The shuffled array.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements i and j
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

/**
 * Builds an object with keys composed of a base key and index, and undefined values.
 * @param {Number} length - Number of keys to generate.
 * @param {String} key - Base key to be used.
 * @return {Object} The object with undefined keys.
 */
function buildUndefinedKeysObject(length, key) {
    const obj = {}
    for (let i = 1; i <= length; i++) {
        obj[`${key}${i}`] = undefined;  // Added '= undefined' to actually set the value
    }
    return obj;
}

/**
 * Sanitizes an array of objects, ensuring that all strings are safe from XSS attacks.
 * @param {Array} arr - The array containing objects to sanitize.
 * @return {Array} The sanitized array.
 */

function sanitize(arr) {
    arr.map(obj => {
        for (let key in obj) {
            if (Array.isArray(obj[key])) {
                obj[key] = obj[key].map(str => {
                    return DOMPurify.sanitize(str)
                });
            } else if (typeof obj[key] === "string") {
                obj[key] = DOMPurify.sanitize(obj[key]);
            }
        }
    });
    return arr;
}

export {shuffle, buildUndefinedKeysObject, sanitize}