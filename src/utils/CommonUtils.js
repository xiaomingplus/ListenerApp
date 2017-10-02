"use strict";

export function NaviGoBack(navigator) {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
}

export function isEmptyObject(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
}

export function removeArray(arr, val) {
    const index = indexOfArray(arr, val);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
function indexOfArray(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val)
            return i;
    }
    return -1;
}

export function time() {
    return parseInt(new Date().getTime() / 1000);
}
export function getRootUrl(url) {
    return url.toString().replace(/^(.*\/\/[^\/?#]*).*$/, "$1");
}
