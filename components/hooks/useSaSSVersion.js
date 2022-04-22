/**
 * @name: useVersion
 * @author mahai
 * @date 2022/4/19 2:04 PM
 * @description 获取版本的自定义hooks
 */
import React, {useEffect} from 'react';
import {LOCALSTORAGE_KEY, getUser} from "doublekit-core-ui";
import api from "../login/api";


const useSaSSVersion = (code) => {
    const user = getUser();

    useEffect(() => {
        if(user.tenant) {
            (async () => {
                await getVersion()
            })()
        }
    }, []);

    const getVersion = async () => {
        const res = await api.getSassVersion(code, user.tenant)
        if (!res.code) {
            localStorage.setItem(LOCALSTORAGE_KEY.VERSION_INFO, JSON.stringify(res.data))
        }
    };
}

export default useSaSSVersion
