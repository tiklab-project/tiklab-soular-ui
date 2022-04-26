/**
 * @name: useVersion
 * @author mahai
 * @date 2022/4/19 2:04 PM
 * @description 获取版本的自定义hooks
 */
import React, {useEffect} from 'react';
import {LOCALSTORAGE_KEY, getUser, urlQuery} from "doublekit-core-ui";
import api from "../login/api";


const useSaSSVersion = (code) => {
    // 如果是官网首页嵌套portal系统，通过url把用户数据携带过来, 通过ifarme方式
    const query = urlQuery(location.hash);
    const user = getUser();

    useEffect(() => {
        if(user.tenant || query.tenant) {
            (async () => {
                await getVersion(user.tenant || query.tenant)
            })()
        }
    }, []);

    const getVersion = async (tenant) => {
        const res = await api.getSassVersion(code, tenant)
        if (!res.code) {
            localStorage.setItem(LOCALSTORAGE_KEY.VERSION_INFO, JSON.stringify(res.data))
        }
    };
}

export default useSaSSVersion
