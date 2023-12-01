import {Axios} from 'tiklab-core-ui';

/**
 * 获取日志
 * @param params
 * @returns {Promise<unknown>}
 */
export const getOplogPageService = async params => {
    return await Axios.post('/oplog/findlogpage', params);
}

export const getOpLogTypeListService = async params => {
    return await Axios.post('/oplog/type/findlogtypelist', params)
}

/**
 * 获取所有工作台应用链接
 * @returns {Promise<*[]|*>}
 */
export const getWorkListService = async () => {
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
export const updateWorkService = async data => {
    return await Axios.post('/appLink/updateAppLink', data);
};


/**
 * 删除工作台产品应用链接
 * @param id
 * @returns {Promise<unknown>}
 */
export const deleteWorkByIDService = async id => {
    const formData = new FormData();
    formData.append('id', id);

    return await Axios.post('/appLink/deleteAppLink', formData);
};

/**
 * 添加工作台产品应用链接
 * @param data
 * @returns {Promise<unknown>}
 */
export const createWorkAppLinkService = async data => {
    return await Axios.post('/appLink/createAppLink', data);
};

/**
 * 获取所有待办
 * @param params
 * @returns {Promise<unknown>}
 */
export const getTodoPageService = async params => {
    return await Axios.post('/todo/findtodopage', params);
}

export const findUserPage = async value => {
    return await Axios.post('/user/user/findUserPage',value)
}

export const findAllGroup = async value => {
    return await Axios.post('/usergroup/findAllGroup')
}

export const findRolePage = async value => {
    return await Axios.post('/role/findRolePage',value)
}

export const findOrga = async value => {
    const param = {
        parentOrgaId:value
    }
    return await Axios.post('/user/orga/findOrgaList',param)
}
