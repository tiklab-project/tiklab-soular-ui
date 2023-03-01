/**
 * @name: api
 * @author mahai
 * @date 2022/6/14 2:20 PM
 * @description api
 */
import {Axios} from 'tiklab-core-ui';


const getMessageListService = async (params) => {
    return await Axios.post('/Message/messageItem/findMessageDispatchItemPage', params);
}
export {
    getMessageListService
}
