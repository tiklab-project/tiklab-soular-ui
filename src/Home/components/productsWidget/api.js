/**
 * @name: api
 * @author mahai
 * @date 2022/6/14 2:20 PM
 * @description api
 */
import {Axios} from 'tiklab-core-ui';

/**
 * 获取所有工作台应用链接
 * @returns {Promise<*[]|*>}
 */
const getWorkListService = async () => {
    const appData = await Axios.post('/appLink/findAppLinkList', {});
    if (!appData.code) {
        return appData.data;
    }
    return [];
};

/**
 * 更新工作台产品应用链接
 * @param data
 * @returns {Promise<unknown>}
 */
const updateWorkService = async data => {
    return await Axios.post('/appLink/updateAppLink', data);
};


/**
 * 删除工作台产品应用链接
 * @param id
 * @returns {Promise<unknown>}
 */
const deleteWorkByIDService = async id => {
    const formData = new FormData();
    formData.append('id', id);

    return await Axios.post('/appLink/deleteAppLink', formData);
};

/**
 * 添加工作台产品应用链接
 * @param data
 * @returns {Promise<unknown>}
 */
const createWorkAppLinkService = async data => {
    return await Axios.post('/appLink/createAppLink', data);
};

export {
    getWorkListService,
    updateWorkService,
    deleteWorkByIDService,
    createWorkAppLinkService
}
