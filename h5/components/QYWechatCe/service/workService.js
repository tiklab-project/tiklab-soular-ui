/**
 * @name: workService
 * @author: mahai
 * @date: 2021-06-28 15:31
 * @description：workService
 * @update: 2021-06-28 15:31
 */
import { Axios } from 'tiklab-core-ui';

class InternalWechatService {

    // 现在企业微信中打开基于内部应用的项目的登录
    internalWechatLogin = async (code) => {
        const formData = new FormData();
        formData.append("code", code)
        const appData = await Axios.post('/wechat/passport/internallogin', formData);
        return appData;
    }


    // 现在企业微信中打开基于内部应用的项目ACC的登录
    internalWechatAccLogin = async (params) => {
        const appData = await Axios.post('/wechat/passport/internalacclogin', params);
        return appData;
    }
}
export default new InternalWechatService()
