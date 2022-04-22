/**
 * @Author: mahai
 * @Description: api 类
 * create: $2022/1/25
 */
import {Axios} from 'doublekit-core-ui'


const DINGDING_LOGIN = '/dingding/passport/login';
const DINGDING_CONFIG = '/dingdingcfg/findId';
const DINGDING_LOGOUT = '/dingding/passport/logout'
const LOGIN = 'passport/login';
const LOGOUT = 'passport/logout';

const WECHAT_LOGOUT = '/wechat/passport/logout';
const WECHAT_LOGIN = '/wechat/passport/login';
const WECHAT_CONFIG = '/wechatcfg/findWechatById';

const LDAP_LOGIN = '/ldap/passport/login';
const LDAP_LOGOUT = '/ldap/passport/logout'

const VALID_TICKET_API = '/passport/valid';


const AUTH_CONFIG = '/authConfig/getAuthConfig';

const GET_VERSION = '/version/getVersion';
const GET_SASS_VERSION = '/version/sass/getVersion';


class Api {

    getConfByRelDirectoryId = async relDirectoryId => {
        const formData = new FormData();
        formData.append('relDirectory', relDirectoryId)
        switch (relDirectoryId) {
            case "3":
                return await Axios.post(DINGDING_CONFIG,formData);
            case "4":
                return await Axios.post(WECHAT_CONFIG,formData);
        }
    }

    /**
     * 钉钉登录
     * @param params
     * @returns {Promise<*>}
     */
    dingDingLogin = async (params) => {
        return await Axios.post(DINGDING_LOGIN,params)
    }
    /**
     * 获取钉钉的配置数据
     * @param id 钉钉用户目录
     * @returns {Promise<void>}
     */
    dingdingConfig = async id => {
        const formData = new FormData();
        formData.append('relDirectory', id)
        return await Axios.post(DINGDING_CONFIG,formData)
    }

    wechatLogin = async (params) => {
        return await Axios.post(WECHAT_LOGIN, params)
    }

    /**
     * 登录
     * @param params
     * @returns {Promise<*>}
     */
    login = async (params) => {
        return await Axios.post(LOGIN, params)
    }

    ldapLogin = async (params) => {
        return await Axios.post(LDAP_LOGIN, params)
    }
    /**
     * 退出
     * @param params
     * @returns {Promise<*>}
     */
    logout = async (ticket) => {
        const formData = new FormData();
        formData.append("ticket",ticket)
        const loginType = ticket.substring(ticket.length-2,ticket.length);
        switch (loginType) {
            case "21": {
                return await Axios.post(LOGOUT, formData)
            }
            case "22":{
                return await this.LDAPLogout(ticket)
            }
            case "23":{
                return await this.dingdingLogout(ticket)
            }
            case "24":
                debugger
                break
            case "25":{
                // 企业内部
                const res = await this.weChatLogout(ticket)
                return res;
            }
            case "26":{
                // 企业微信服务商
                const res = await this.weChatLogout(ticket)
                return res;
            }
            default:{
                return await Axios.post(LOGOUT, formData)
            }
        }

    }


    /**
     * 微信退出
     * @param params
     * @returns {Promise<*>}
     */
    weChatLogout = async (ticket) => {
        const formData = new FormData();
        formData.append("ticket",ticket)
        return await Axios.post(WECHAT_LOGOUT, formData)
    }


    /**
     * ldap退出
     * @param params
     * @returns {Promise<*>}
     */
    LDAPLogout = async (ticket) => {
        const formData = new FormData();
        formData.append("ticket",ticket)
        return await Axios.post(LDAP_LOGOUT, formData)
    }



    /**
     * 钉钉退出
     * @param params
     * @returns {Promise<*>}
     */
    dingdingLogout = async (ticket) => {
        const formData = new FormData();
        formData.append("ticket",ticket)
        return await Axios.post(DINGDING_LOGOUT, formData)
    }


    /**
     * 获取登录配置方式
     * @returns {Promise<*>}
     */
    authConfig = async () => {
        return await Axios.post(AUTH_CONFIG)
    }


    validTicket = async (ticket) => {
        const formData = new FormData();
        formData.append("ticket", ticket)
        const res = await Axios.post(VALID_TICKET_API, formData)
        return res;
    }


    getVersion = async () => {
        const res = await Axios.post(GET_VERSION);
        return res;
    }
    getSassVersion = async (code) => {
        const formData = new FormData();
        formData.append("code", code)
        const res = await Axios.post(GET_SASS_VERSION, formData);
        return res;
    }


}

export default new Api();
