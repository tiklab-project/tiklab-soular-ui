/**
 * @name: api
 * @author mahai
 * @date 2022/6/14 2:20 PM
 * @description api
 */
import {Axios} from 'doublekit-core-ui';


class MessageServer  {

    getMessageList = async (params) => {
        const appData = await Axios.post('/messageDispatchItem/findMessageDispatchItemPage', params);
        return appData;
    };



}

export default new MessageServer()
