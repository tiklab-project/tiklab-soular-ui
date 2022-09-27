
/**
 * @Author: mahai
 * @Description: 退出的方法封装
 * create: $2022/1/24
 */

import {getUser, removeUser} from "tiklab-core-ui";


// Sass 项目
const loginOutSaas = (accUrl, redirect) => {
    removeUser()
    location.href = `${accUrl}/#/logout?redirect=${redirect || window.location.origin}`
}

// 社区 企业退出登录 （本地登录和acc登录）
const loginOutAcc = (accUrl) => {
    removeUser()
    // 数据库配置
    const url =`${accUrl}/#/logout?redirect=${window.location.origin}`
    window.location.href = url
}

const loginOutLocal = async (history, portalLoginStore, localLogin='/login', search) => {
    const {logout} = portalLoginStore;
    const user = getUser();
    if (user.ticket) {
        logout(user.ticket)
        if (search) {
            const url = window.location.href + search
            window.location.href = url
        }
        history.push(localLogin)
    } else {
        if (search) {
            const url = window.location.href + search
            window.location.href = url
        }
        history.push(localLogin)
    }
}


export {
    loginOutSaas,
    loginOutAcc,
    loginOutLocal,
}
