/**
 * @name: workService
 * @author: mahai
 * @date: 2021-06-28 15:31
 * @description：workService
 * @update: 2021-06-28 15:31
 */
import {Axios} from 'tiklab-core-ui';

/**
 * 获取当前可使用的 widget
 * @param data
 * @returns {Promise<unknown>}
 */
const getWidgetListService = async (data) => {
    return await Axios.post('/widget/findWorkWidgetList', data);
}

/**
 * 获取所有 widget
 * @param data
 * @returns {Promise<unknown>}
 */
const findWorkWidgetPageService = async (data) => {
    return await Axios.post('/widget/findWorkWidgetPage', data);
}

/**
 * 添加 widget
 * @param data
 * @returns {Promise<unknown>}
 */
const createWidgetService = async (data) => {
    return await Axios.post('/widget/createWorkWidget', data);
}

/**
 * 更新 widget
 * @param data
 * @returns {Promise<unknown>}
 */
const updateWidgetService = async (data) => {
    return await Axios.post('/widget/updateWorkWidget', data);
}

/**
 * 删除 widget
 * @param id
 * @returns {Promise<unknown>}
 */
const deleteWidgetService = async (id) => {
    const formData = new FormData()
    formData.append('id', id)
    return await Axios.post('/widget/deleteWorkWidget', formData);
}

/**
 * 获取用户 widget 布局
 */
const findLayoutService = async (data) => {
    return await Axios.post('/widgetLayout/findLayout', data);
}

/**
 * 创建用户 widget
 */
const createLayoutService = async (data) => {
    return await Axios.post('/widgetLayout/createLayout', data);
}

/**
 * 更新用户 widget
 */
const updateLayoutService = async (data) => {
    return await Axios.post('/widgetLayout/updateLayout', data);
}

/**
 *
 * @param data
 * @returns {Promise<*>}
 */
const createWorkAppLinkService = async data => {
    const appData = await Axios.post('/workAppLink/createWorkAppLink', data);
    return appData;
};

/**
 * 获取所有应用数据
 * @returns {Promise<*[]|*>}
 */
const getWorkListService = async () => {
    const appData = await Axios.post('/workAppLink/findWorkAppLinkList', {});
    if (!appData.code) {
        return appData.data;
    }
    return [];
};

const findWorkByIDService = async id => {
    const formData = new FormData();
    formData.append('id', id);
    const appData = await Axios.post('/workAppLink/findWorkAppLink', formData);
    if (!appData.code) {
        return appData.data;
    }
    return {};
};

const deleteWorkByIDService = async id => {
    const formData = new FormData();
    formData.append('id', id);

    return await Axios.post('/workAppLink/deleteWorkAppLink', formData);
};

const updateWorkService = async data => {
    return await Axios.post('/workAppLink/updateWorkAppLink', data);
};

export {
    updateWorkService,
    deleteWorkByIDService,
    findWorkByIDService,
    getWorkListService,
    createWorkAppLinkService,
    updateLayoutService,
    createLayoutService,
    findLayoutService,
    deleteWidgetService,
    updateWidgetService,
    createWidgetService,
    findWorkWidgetPageService,
    getWidgetListService
}
