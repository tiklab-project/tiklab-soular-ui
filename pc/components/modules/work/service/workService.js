/**
 * @name: workService
 * @author: mahai
 * @date: 2021-06-28 15:31
 * @description：workService
 * @update: 2021-06-28 15:31
 */
import { Axios } from 'doublekit-core-ui';

const GET_WIDGET_LIST = '/widget/findWorkWidgetList';
const CREATE_WIDGET = '/widget/createWorkWidget';
const UPDATE_WIDGET = '/widget/updateWorkWidget';

const DELETE_WIDGET = '/widget/deleteWorkWidget';


const FIND_USER_LAYOUT = '/widgetLayout/findLayout'
const CREATE_USER_LAYOUT = '/widgetLayout/createLayout'
const UPDATE_USER_LAYOUT = '/widgetLayout/updateLayout'
class WorkService {


    /**
     * 获取当前可使用的 widget
     */
    getWidgetList = async (data) => {
        const list = await Axios.post(GET_WIDGET_LIST, data);
        return list;
    }

    createWidget = async (data) => {
        const list = await Axios.post(CREATE_WIDGET, data);
        return list;
    }

    updateWidget = async (data) => {
        const list = await Axios.post(UPDATE_WIDGET, data);
        return list;
    }

    deleteWidget = async (id) => {
        const formData = new FormData()
        formData.append('id', id)
        const list = await Axios.post(DELETE_WIDGET, formData);
        return list;
    }

    /**
     * 获取用户 widget 布局
     */
    findLayout = async (data) => {
        const list = await Axios.post(FIND_USER_LAYOUT, data);
        return list;
    }

    /**
     * 创建用户 widget
     */
    createLayout = async (data) => {
        const list = await Axios.post(CREATE_USER_LAYOUT, data);
        return list;
    }
    /**
     * 更新用户 widget
     */
    updateLayout = async (data) => {
        const list = await Axios.post(UPDATE_USER_LAYOUT, data);
        return list;
    }
    /**
     *
     * @param data
     * @returns {Promise<*>}
     */
    createWorkAppLink = async data => {
        const appData = await Axios.post('/workAppLink/createWorkAppLink', data);
        return appData;
    };

    // 获取所有应用数据
    getWorkList = async () => {
        const appData = await Axios.post('/workAppLink/findWorkAppLinkList', {});
        if (!appData.code) {
            return appData.data;
        }
        return [];
    };

    findWorkByID = async id => {
        const formData = new FormData();
        formData.append('id', id);
        const appData = await Axios.post('/workAppLink/findWorkAppLink', formData);
        if (!appData.code) {
            return appData.data;
        }
        return {};
    };

    deleteWorkByID = async id => {
        const formData = new FormData();
        formData.append('id', id);

        const appData = await Axios.post('/workAppLink/deleteWorkAppLink', formData);
        return appData;
    };

    updateWork = async data => {
        const updateData = await Axios.post('/workAppLink/updateWorkAppLink', data);
        return updateData;
    };

}
export default new WorkService()
