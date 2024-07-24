import {action,observable} from "mobx";
import {Axios} from 'thoughtware-core-ui';

/**
 * 获取日志
 * @param params
 * @returns {Promise<unknown>}
 */
export const getOplogPageService = async params => {
    return await Axios.post('/oplog/findlogpage', params);
}

/**
 * 获取日志统计
 */
export const findLoggingCountList = async () => {
    return await Axios.post('/oplog/findLoggingCountList');
}

/**
 * 获取日志类型
 */
export const findlogtypelist = async () => {
    return await Axios.post('/oplog/type/findlogtypelist',{
        bgroup:"eas"
    });
}

/**
 * 获取所有待办
 * @param params
 * @returns {Promise<unknown>}
 */
export const getTodoPageService = async params => {
    return await Axios.post('/todo/findtodopage', params);
}

/**
 * 待办统计
 * @param params
 * @returns {Promise<unknown>}
 */
export const findTodoCount = async params => {
    return await Axios.post('/todo/findTodoCount', params);
}

export class HomeStore {

    // 应用链接
    @observable
    installApp = [];

    @action
    setInstallApp = (data) => {
        this.installApp = data;
    }

}

export const HOME_STORE = 'homeStore';
