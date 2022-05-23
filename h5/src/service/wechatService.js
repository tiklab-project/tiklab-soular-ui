/**
 * @name: workService
 * @author: mahai
 * @date: 2021-06-28 15:31
 * @description：workService
 * @update: 2021-06-28 15:31
 */
import { Axios } from 'doublekit-core-ui';

// 获取企业微信authurl
const WECHAT_AUTH_URL = '/authConfig/getInternalWechatAuthUrl';

class WechatService {
    getAuthWechat = async () => {
        return await Axios.post(WECHAT_AUTH_URL)
    }
}
export default new WechatService()
