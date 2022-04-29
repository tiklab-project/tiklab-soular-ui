/**
 * @name: accountApi
 * @author mahai
 * @date 2022/3/21 2:24 PM
 * @description accountApi
 */

import {Axios} from "doublekit-core-h5";

const LOGIN_API = '/passport/login';
const RAM_LOGOUT_API = '/passport/logout';

const LDAP_LOGOUT = '/ldap/passport/logout';


const DINGDING_LOGOUT = '/dingding/passport/logout'

const WECHAT_LOGOUT = '/wechat/passport/logout';

const AUTH_CONFIG = '/authConfig/getAuthConfig';

class AccountApi {
    async login(data, axiosHeader) {
        const res = await Axios.post(LOGIN_API, data, axiosHeader)
        return res;
    };
    async ldapLogin(data, axiosHeader) {
        const res = await Axios.post(LDAP_LOGOUT, data, axiosHeader)
        return res;
    };
    async logout (ticket, axiosHeader) {
        const loginType = ticket.substring(ticket.length-2,ticket.length);
        const formData = new FormData();
        formData.append("ticket",ticket)
        let response;
        switch (loginType) {
            case "21":
                response = await Axios.post(RAM_LOGOUT_API, formData, axiosHeader)
                break
            case "22":
                response = await Axios.post(LDAP_LOGOUT, formData, axiosHeader)
                break
            case "23":
                response = await Axios.post(DINGDING_LOGOUT, formData, axiosHeader)
            case "24":
                debugger
                break
            case "25":
                debugger
                break
            case "26":
                response = await Axios.post(WECHAT_LOGOUT, formData, axiosHeader)
                debugger
            default:
                response = await Axios.post(RAM_LOGOUT_API, formData, axiosHeader)
                break
        }
        return response
    }

    /**
     * 获取登录配置方式
     * @returns {Promise<*>}
     */
    authConfig = async (axiosHeader) => {
        return await Axios.post(AUTH_CONFIG, {}, axiosHeader)
    }


}
const accountApi = new AccountApi();
export default accountApi;
