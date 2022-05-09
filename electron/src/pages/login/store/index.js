/**
 * @name: index
 * @author: mahai
 * @date: 2021-09-01 13:59
 * @description：index
 * @update: 2021-09-01 13:59
 */
import { action, observable } from 'mobx';
import Cookies from 'js-cookie'

const getUser = () => {
    try {
        // @ts-ignore
        if (cookieDomain) {
            return Cookies.get()
        }
    } catch (e) {
        const cookies =  Object.keys(Cookies.get()).map(cookeName => {
            const key = cookeName.replace(window.location.host+ '_', '');
            return {[key]: Cookies.get(cookeName)}
        }).reduce((prev, cur)=> {
            return {...prev, ...cur}
        },{})
        return cookies
    }
}

const removeUser = () => {
    const host = window.location.host.toString()
    try {
        // @ts-ignore
        Cookies.remove('name', {domain:cookieDomain});
        // @ts-ignore
        Cookies.remove('email', {domain:cookieDomain});
        // @ts-ignore
        Cookies.remove('phone', {domain:cookieDomain});
        // @ts-ignore
        Cookies.remove('ticket', {domain:cookieDomain});
        // @ts-ignore
        Cookies.remove('userId', {domain:cookieDomain})
    } catch (e) {
        Cookies.remove(host + '_name');
        Cookies.remove(host + '_email');
        Cookies.remove(host + '_phone');
        Cookies.remove(host + '_ticket');
        Cookies.remove(host +'_userId')
    }
}

const setUser = (name, email, phone, ticket, userId ) => {
    const host = window.location.host.toString()
    try {
        // @ts-ignore
        Cookies.set('name', name, {domain:cookieDomain});
        // @ts-ignore
        Cookies.set('email', email, {domain:cookieDomain});
        // @ts-ignore
        Cookies.set('phone', phone, {domain:cookieDomain});
        // @ts-ignore
        Cookies.set('ticket', ticket, {domain:cookieDomain});
        // @ts-ignore
        Cookies.set('userId', userId, {domain:cookieDomain});
    } catch (e) {
        Cookies.set(host + '_name', name);
        Cookies.set(host + '_email', email);
        Cookies.set(host + '_phone', phone);
        Cookies.set(host + '_ticket', ticket);
        Cookies.set(host +'_userId', userId)
    }
}



export class LoginStore {
    @observable user = getUser() || {};
    // @ts-ignore
    @observable isLogin = !!getUser().ticket;
    @action
    login = (data) => {
        setUser(data.name, data.email, data.phone, data.ticket, data.userId)
        this.user = data
        this.isLogin = true
    }
    @action
    logout = () => {
        removeUser()
        this.isLogin = false
    }
}
// 门户中心登录 store 常量
export const LOGIN_STATUS = 'portalLoginStore';
