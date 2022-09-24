/**
 * @name: api
 * @author mahai
 * @date 2022/9/23 1:33 PM
 * @description api
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
