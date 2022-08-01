/**
 * @name: api
 * @author mahai
 * @date 2022/6/14 2:20 PM
 * @description api
 */
import {Axios} from 'tiklab-core-ui';


class ProductWidgetsServer  {

    getWorkList = async () => {
        const appData = await Axios.post('/workAppLink/findWorkAppLinkList', {});
        if (!appData.code) {
            return appData.data;
        }
        return [];
    };

    updateWork = async data => {
        return await Axios.post('/workAppLink/updateWorkAppLink', data);
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

    createWorkAppLink = async data => {
        const appData = await Axios.post('/workAppLink/createWorkAppLink', data);
        return appData;
    };
}

export default new ProductWidgetsServer()
