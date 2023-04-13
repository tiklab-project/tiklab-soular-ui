/**
 * @name: api
 * @author mahai
 * @date 2022/6/14 2:20 PM
 * @description api
 */
import {Axios} from 'tiklab-core-ui';

/**
 * 获取所有消息
 * @param params
 * @returns {Promise<unknown>}
 */
const getMessageListService = async (params) => {
    return await Axios.post('/message/messageItem/findMessageDispatchItemPage', params);
}

export {
    getMessageListService
}
