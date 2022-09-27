/**
 * @name: index
 * @author mahai
 * @date 2022/3/22 9:07 AM
 * @description index
 */
import { action, observable } from 'mobx';
import accountApi from '../service/accountApi';

import {getUser, removeUser, saveUser} from 'tiklab-core-ui'

export class LoginStore {
    @observable user = getUser() || {};
    @observable isLogin = !!getUser().ticket;
    @action
    login = async (data) => {
        const {tenant = undefined, ...otherData} = data;
        let res;
        if (tenant) {
            res = await accountApi.login(otherData, {tenant:tenant});
        } else {
            res = await accountApi.login(otherData);
        }
        if (!res.code) {
            saveUser(res.data)
            this.user = res.data
            this.isLogin = true
        }
        return res
    }
    @action
    logout = async (ticket) => {
        let response = await accountApi.logout(ticket);
        if (!response.code) {
            removeUser()
            this.isLogin = false
        }
        return response

    }
}
// 门户中心登录 store 常量
export const LOGIN_STATUS = 'portalLoginStore';
