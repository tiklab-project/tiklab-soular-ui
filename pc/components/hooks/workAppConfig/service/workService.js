/**
 * @name: workService
 * @author: mahai
 * @date: 2021-06-28 15:31
 * @description：workService
 * @update: 2021-06-28 15:31
 */
import {Axios} from 'doublekit-core-ui';


const CREATE_LINK = "/appLink/createAppLink";
const FINDAPPLINKLIST = '/appLink/findAppLinkList'
const FINDAPPLINK = '/appLink/findAppLink';
const DELETEAPPLINK = '/appLink/deleteAppLink';
const UPDATEAPPLINK = '/appLink/updateAppLink';

class WorkService {


    /**
     *
     * @param data
     * @returns {Promise<*>}
     */
    createWorkAppLink = async data => {
        return await Axios.post(CREATE_LINK, data);
    };

    // 获取所有应用数据
    getWorkList = async () => {
        const appData = await Axios.post(FINDAPPLINKLIST, {});
        if (!appData.code) {
            return appData.data;
        }
        return [];
    };

    findWorkByID = async id => {

        const formData = new FormData();
        formData.append('id', id);
        const appData = await Axios.post(FINDAPPLINK, formData);
        if (!appData.code) {
            return appData.data;
        }
        return {};
    };

    deleteWorkByID = async id => {
        const formData = new FormData();
        formData.append('id', id);

        return await Axios.post(DELETEAPPLINK, formData);
    };

    updateWork = async data => {
        return await Axios.post(UPDATEAPPLINK, data);
    };

}
export default new WorkService()
