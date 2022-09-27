/**
 * @name: wechat.service
 * @author mahai
 * @date 2022/3/10 11:36 AM
 * @description 企业微信第三方服务接口
 */
import {Axios} from "tiklab-core-ui";
const WECHAT_APPLICATION_TENANT = "/wechatapplication/create"

const WECHAT_APPLICATION_SYNC_DATA = "/wechatapplication/syncdata";

const WECHAT_APPLICATION_VAILD = "/wechatapplication/vaildTentant";
const WECHAT_APPLICATION_TENANT_BY_CORPID = "/wechatapplication/getTenant";

//  获取企业微信第三方用户数据
const WECHAT_APPLICATION_USER_INFO = '/wechatCallback/getUserinfo3rd'

class WeChatService  {


    async getWechatApplicationTicket(data, axiosHeader) {
        const res = await Axios.post(WECHAT_APPLICATION_TENANT, data, axiosHeader)
        return res;
    };


    async syncWechatApplication(data, axiosHeader) {
        const res = await Axios.post(WECHAT_APPLICATION_SYNC_DATA, data, axiosHeader)
        return res;
    };
    async checkWechatApplication(data) {
        const res = await Axios.post(WECHAT_APPLICATION_VAILD, data)
        return res;
    };

    async getTenantByCorpId(id) {
        const formData = new FormData();
        formData.append("corpId", id)
        const res = await Axios.post(WECHAT_APPLICATION_TENANT_BY_CORPID, formData)
        return res;
    };

    async getUserinfo3rd(code, type = 'pc') {
        const formData = new FormData();
        formData.append("code", code);
        formData.append("type", type)
        const res = await Axios.post(WECHAT_APPLICATION_USER_INFO, formData)
        return res;
    };
}

const weChatServiceApi = new WeChatService();
export default weChatServiceApi;
