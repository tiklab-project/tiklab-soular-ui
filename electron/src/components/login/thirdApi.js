/**
 * @name: thirdApi
 * @author mahai
 * @date 2022/5/7 8:57 PM
 * @description thirdApi
 */
import {Axios} from 'doublekit-core-ui';
/****************** 社区版 接口**********************/
const DINGDING_LOGIN = '/dingding/passport/login';
const DINGDING_CONFIG = '/dingdingcfg/findId';

const WECHAT_CONFIG = '/wechatcfg/findWechatById';

const WECHAT_LOGIN = '/wechat/passport/login';


/****************** sass 接口**********************/
const WECHAT_APPLICATION_TENANT_BY_CORPID = "/wechatapplication/getTenant";
//  获取企业微信第三方用户数据
const WECHAT_APPLICATION_USER_INFO = '/wechatCallback/getUserinfo3rd'
//  企业微信扫码登录
const WECHAT_QCORD_INFO = '/wechatapplication/getPermanentCodeByAuthCode'
const WECHAT_QCORD_LOGIN = '/wechatapplication/getSassScanByUserId'

class ThirdApi {

    /*********************社区版***************************/
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

    dingDingLogin = async (params) => {
        return await Axios.post(DINGDING_LOGIN,params)
    }

    wechatLogin = async (params) => {
        return await Axios.post(WECHAT_LOGIN, params)
    }

    /*********************sass版***************************/
    getTenantByCorpId = async (corpId) => {
        const formData = new FormData();
        formData.append("corpId", corpId)
        const res = await Axios.post(WECHAT_APPLICATION_TENANT_BY_CORPID, formData)
        return res;
    }

    async wechatInfoForQrcode(code) {
        const formData = new FormData();
        formData.append("authCode", code);
        const res = await Axios.post(WECHAT_QCORD_INFO, formData)
        return res;
    };

    async wechatScanLoginForUserId(userId, axiosHeader={}) {
        const formData = new FormData();
        formData.append("userId", userId);
        const res = await Axios.post(WECHAT_QCORD_LOGIN, formData, axiosHeader)
        return res;
    };
}

export default new ThirdApi();
