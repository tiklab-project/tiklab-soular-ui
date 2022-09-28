/**
 * @name: todoServer
 * @author mahai
 * @date 2022/9/28 9:27 AM
 * @description 待办接口
 */
import {Axios} from 'tiklab-core-ui';

const TODO_LIST_PAGE = '/todo/findtodopage';

class TodoServer {
    getTodoPage = async params => {
        const appData = await Axios.post(TODO_LIST_PAGE, params);
        return appData;
    }
}

export default new TodoServer();
