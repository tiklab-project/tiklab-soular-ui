/**
 * @name: todoServer
 * @author mahai
 * @date 2022/9/28 9:27 AM
 * @description 待办接口
 */
import {Axios} from 'tiklab-core-ui';
const MESSAGE_LIST_PAGE = '/message/messageDispatchItem/findMessageDispatchItemPage';

class MessageSever{
    getMessageList = async (params) => {
        const appData = await Axios.post(MESSAGE_LIST_PAGE, params);
        return appData;
    };
}

export default new MessageSever();
