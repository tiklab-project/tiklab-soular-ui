

import {scopedClassMaker} from './classes';

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



export {
    scopedClassMaker,
    parseSearch,
}
