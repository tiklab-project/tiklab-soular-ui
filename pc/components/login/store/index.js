/**
 * @name: index
 * @author: mahai
 * @date: 2021-09-01 13:59
 * @description：index
 * @update: 2021-09-01 13:59
 */
import { action, observable } from 'mobx';
import api from '../api';

import {getUser, removeUser, saveUser, setCookie} from 'doublekit-core-ui'

class LoginStore {
    @observable user = getUser() || {};
    @observable isLogin = !!getUser().ticket;
    @action
    login = async (data) => {
        const userType = data.userType;
        let res;
        if (userType === '2') {
            res = await api.ldapLogin(data)
        } else {
            res = await api.localLogin(data);
        }
        if (!res.code) {
            setCookie('loginType',userType === "2" ? "ldap" : "local")
            saveUser(res.data)
            this.user = res.data
            this.isLogin = true
        }
        return res
    }
    @action
    dingdingLogin = async params => {
        const res = await api.dingDingLogin(params);
        if (!res.code) {
            setCookie('loginType',"dingdingQR")
            saveUser(res.data)
            this.user = res.data
            this.isLogin = true
        }
        return res
    }
    @action
    logout = async (ticket) => {
        const loginType = ticket.substring(ticket.length-2,ticket.length);

        let response;
        switch (loginType) {
            case "21":
                response = await api.logout(ticket);
                break
            case "22":
                response = await api.LDAPLogout(ticket);
                break
            case "23":
                response = await api.dingdingLogout(ticket);
                break
            case "25":
                // 企业内部应用
                response = await api.weChatLogout(ticket);
                break
            case "26":
                // 企业sass应用
                response = await api.weChatLogout(ticket);
                break
            default:
                response = await api.logout(ticket);
                break
        }
        if (!response.code) {
            removeUser()
            this.isLogin = false
        }

    }
}
// 门户中心登录 store 常量
const LOGIN_STATUS = 'portalLoginStore';
export {
    LOGIN_STATUS,
    LoginStore
}
