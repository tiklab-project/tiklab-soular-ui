
/**
 * @Author: mahai
 * @Description: 退出的方法封装
 * create: $2022/1/24
 */

import {LOCALSTORAGE_KEY, removeUser} from "doublekit-core-ui";

const loginOutAcc = (accUrl, history, state) => {
    removeUser()
    localStorage.removeItem('redirect')
    try {
        if (electronVersion) {
            history.push('/login')
        }
    } catch (e) {
        const authConfig = localStorage.getItem(LOCALSTORAGE_KEY.AUTH_CONFIG) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.AUTH_CONFIG)) : {};

        let url =`${window.location.origin}/#/login?redirect=${accUrl}`
        if (authConfig.authType === 'acc') {
            if (accUrl !== "null") {
                if (state && state.preRoute) {
                    url =`${accUrl}/#/login?redirect=${location.origin}/#${state.preRoute}`
                } else {
                    url=`${accUrl}/#/login?redirect=${location.origin}`
                }
            } else {
                url=`${location.origin}/#/login?redirect=${location.origin}`
            }
        } else {
            if (state && state.preRoute) {
                url =`${window.location.origin}/#/login?redirect=${accUrl}/#${state.preRoute}`
            } else {
                url=`${window.location.origin}/#/login?redirect=${accUrl}`
            }
        }
        // 数据库配置
        return window.location.href = url
    }

}


export {
    loginOutAcc,
}
