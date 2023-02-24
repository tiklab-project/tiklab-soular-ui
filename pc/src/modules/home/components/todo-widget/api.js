/**
 * @name: api
 * @author mahai
 * @date 2022/9/23 1:33 PM
 * @description api
 */
import {Axios} from 'tiklab-core-ui';

const TODO_LIST_PAGE = '/todo/findtodopage';

const getTodoPageService = async params => {
    return await Axios.post(TODO_LIST_PAGE, params);
}

export {
    getTodoPageService
}

