/**
 * @name: utils
 * @author mahai
 * @date 2022/5/7 8:31 PM
 * @description utils
 */

function queryUrl (url) {
    let params = {};
    if (!url) return params;
    if (url.split('?').length > 1) {
        let arr = url.split('?')[1].split('&')
        for (let i = 0; i < arr.length; i++) {
            let data = arr[i].split('=')
            if (data.length === 2) {
                params[data[0]] = data[1]
            }
        }
    }
    return params
}

module.exports = {
    queryUrl
}
