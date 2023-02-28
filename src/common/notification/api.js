/**
 * @name: api
 * @author mahai
 * @date 2023/1/3 10:04 AM
 * @description api
 */
import {Axios} from "tiklab-core-ui";

const FIND_MESSAGE_ITEM_PAGE = '/Message/messageItem/findMessageItemPage';
const UPDATE_MESSAGE_ITEM = '/Message/messageItem/updateMessageItem';


const findMessagePageService = async (data) => {
    return await Axios.post(FIND_MESSAGE_ITEM_PAGE, data);
}

const updateMessageService = async (data) => {
    return await Axios.post(UPDATE_MESSAGE_ITEM, data);
}

export {
    findMessagePageService,
    updateMessageService
}
