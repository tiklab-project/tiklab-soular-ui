/**
 * @name: api
 * @author mahai
 * @date 2022/9/23 1:33 PM
 * @description api
 */
import {Axios} from 'tiklab-core-ui';

const OPLOG_LIST_PAGE = '/oplog/findlogpage';
const FIND_OPLOG_TYPE_LIST = '/oplog/type/findlogtypelist';


const getOplogPageService = async params => {
    return await Axios.post(OPLOG_LIST_PAGE, params);
}

const getOpLogTypeListService = async params => {
    return await Axios.post(FIND_OPLOG_TYPE_LIST, params)
}
export {
    getOplogPageService,
    getOpLogTypeListService
}
