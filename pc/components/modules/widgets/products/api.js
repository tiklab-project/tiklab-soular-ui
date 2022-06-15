/**
 * @name: api
 * @author mahai
 * @date 2022/6/14 2:20 PM
 * @description api
 */
import {Axios} from 'doublekit-core-ui';


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


}

export default new ProductWidgetsServer()
