/**
 * @name: api
 * @author mahai
 * @date 2022/6/14 2:20 PM
 * @description api
 */
import {Axios} from 'tiklab-core-ui';


const getWorkListService = async () => {
    const appData = await Axios.post('/appLink/findAppLinkList', {});
    if (!appData.code) {
        return appData.data;
    }
    return [];
};

const updateWorkService = async data => {
    return await Axios.post('/appLink/updateAppLink', data);
};


const deleteWorkByIDService = async id => {
    const formData = new FormData();
    formData.append('id', id);

    return await Axios.post('/appLink/deleteAppLink', formData);
};


const createWorkAppLinkService = async data => {
    return await Axios.post('/appLink/createAppLink', data);
};

export {
    getWorkListService,
    updateWorkService,
    deleteWorkByIDService,
    createWorkAppLinkService
}
