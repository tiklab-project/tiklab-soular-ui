/**
 * @name: todoServer
 * @author mahai
 * @date 2022/9/28 9:27 AM
 * @description 待办接口
 */
import {Axios} from 'tiklab-core-ui';
const OPLOG_LIST_PAGE = '/oplog/findlogpage';

class OpLogSever{
    getOplogPage = async params => {
        const appData = await Axios.post(OPLOG_LIST_PAGE, params);
        return appData;
    }

}

export default new OpLogSever();
