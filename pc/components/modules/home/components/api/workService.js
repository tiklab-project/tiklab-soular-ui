/**
 * @name: workService
 * @author: mahai
 * @date: 2021-06-28 15:31
 * @description：workService
 * @update: 2021-06-28 15:31
 */
import {Axios} from 'tiklab-core-ui';

const GET_WIDGET_PAGE = '/widget/findWorkWidgetPage';
const GET_WIDGET_LIST = '/widget/findWorkWidgetList';
const CREATE_WIDGET = '/widget/createWorkWidget';
const UPDATE_WIDGET = '/widget/updateWorkWidget';

const DELETE_WIDGET = '/widget/deleteWorkWidget';


const FIND_USER_LAYOUT = '/widgetLayout/findLayout'
const CREATE_USER_LAYOUT = '/widgetLayout/createLayout'
const UPDATE_USER_LAYOUT = '/widgetLayout/updateLayout'
/**
 * 获取当前可使用的 widget
 */
const getWidgetListService = async (data) => {
    return await Axios.post(GET_WIDGET_LIST, data);
}

const findWorkWidgetPageService = async (data) => {
    return await Axios.post(GET_WIDGET_PAGE, data);
}

const createWidgetService = async (data) => {
    return await Axios.post(CREATE_WIDGET, data);
}

const updateWidgetService = async (data) => {
    return await Axios.post(UPDATE_WIDGET, data);
}

const deleteWidgetService = async (id) => {
    const formData = new FormData()
    formData.append('id', id)
    return await Axios.post(DELETE_WIDGET, formData);
}

/**
 * 获取用户 widget 布局
 */
const findLayoutService = async (data) => {
    return await Axios.post(FIND_USER_LAYOUT, data);
}

/**
 * 创建用户 widget
 */
const createLayoutService = async (data) => {
    return await Axios.post(CREATE_USER_LAYOUT, data);
}
/**
 * 更新用户 widget
 */
const updateLayoutService = async (data) => {
    return await Axios.post(UPDATE_USER_LAYOUT, data);
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

// 获取所有应用数据
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
