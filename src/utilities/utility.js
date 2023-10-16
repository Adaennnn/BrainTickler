import DOMPurify from "dompurify";

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

function buildUndefinedKeysObject(length, key) {
    const obj = {}
    for (let i = 1; i <= length; i++) {
        obj[`${key}${length}`]
    }
    return obj
}

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