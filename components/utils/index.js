

import {scopedClassMaker} from './classes';
import {LOCALSTORAGE_KEY} from "./constans";


function parseSearch (url) {
    let params = {}
    let h
    let hash = url.slice(url.indexOf('?') + 1).split('&')
    for (let i = 0; i < hash.length; i++) {
        h = hash[i].split('=') //
        params[h[0]] = h[1]
    }
    return params
}

const getVersionInfo = () => {
    const info = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.VERSION_INFO) || {});
    return info;
}
const disableFunction = () => {
    const info = getVersionInfo()
    const objArray = Object.getOwnPropertyNames(info);

    if (objArray.length === 0) {
        return true
    } else {
        if (info.release === 1) {
            return true;
        }
        if (info.release !== 1) {
            return info.expired
        }
    }
}

export {
    scopedClassMaker,
    parseSearch,
    getVersionInfo,
    disableFunction
}
