/**
 * @name: api
 * @author mahai
 * @date 2022/9/23 1:33 PM
 * @description api
 */
import {Axios} from 'tiklab-core-ui';

/**
 * 获取所有代办
 * @param params
 * @returns {Promise<unknown>}
 */
const getTodoPageService = async params => {
    return await Axios.post('/todo/findtodopage', params);
}

export {
    getTodoPageService
}

