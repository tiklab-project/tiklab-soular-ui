/**
 * @name: api
 * @author mahai
 * @date 2022/9/23 1:33 PM
 * @description api
 */
import {Axios} from 'tiklab-core-ui';

/**
 * 获取日志
 * @param params
 * @returns {Promise<unknown>}
 */
const getOplogPageService = async params => {
    return await Axios.post('/oplog/findlogpage', params);
}

const getOpLogTypeListService = async params => {
    return await Axios.post('/oplog/type/findlogtypelist', params)
}

export {
    getOplogPageService,
    getOpLogTypeListService
}
