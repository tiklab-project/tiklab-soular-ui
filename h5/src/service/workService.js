/**
 * @name: workService
 * @author: mahai
 * @date: 2021-06-28 15:31
 * @description：workService
 * @update: 2021-06-28 15:31
 */
import { Axios } from 'tiklab-core-ui';

class WorkService {


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
