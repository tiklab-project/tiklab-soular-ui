
/**
 * @Author: mahai
 * @Description: 退出的方法封装
 * create: $2022/1/24
 */

import {LOCALSTORAGE_KEY, removeUser} from "doublekit-core-ui";

const loginOutAcc = (accUrl, history) => {
    removeUser()
    try {
        if (electronVersion) {
            history.push('/login')
        }
    } catch (e) {
        const authConfig = localStorage.getItem(LOCALSTORAGE_KEY.AUTH_CONFIG) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.AUTH_CONFIG)) : null;
        let url =`${window.location.origin}/#/login?redirect=${accUrl}`
        if (authConfig.authType === 'acc') {
            url=`${accUrl}/#/login?redirect=${window.location.origin}`
        }
        // 数据库配置
        return window.location.href = url
    }

}


export {
    loginOutAcc,
}
