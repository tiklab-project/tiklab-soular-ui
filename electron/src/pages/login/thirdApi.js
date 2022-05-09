/**
 * @name: thirdApi
 * @author mahai
 * @date 2022/5/7 8:57 PM
 * @description thirdApi
 */
import {Axios} from 'doublekit-core-ui';

const DINGDING_LOGIN = '/dingding/passport/login';
const DINGDING_CONFIG = '/dingdingcfg/findId';

const WECHAT_CONFIG = '/wechatcfg/findWechatById';

const WECHAT_LOGIN = '/wechat/passport/login';

class ThirdApi {
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

}

export default new ThirdApi();
