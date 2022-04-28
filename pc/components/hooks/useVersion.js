/**
 * @name: useVersion
 * @author mahai
 * @date 2022/4/19 2:04 PM
 * @description 获取版本的自定义hooks
 */
import React, {useEffect} from 'react';
import {LOCALSTORAGE_KEY} from "doublekit-core-ui";
import api from "../login/api";


const useVersion = () => {

    useEffect(() => {
        (async () => {
            await getVersion()
        })()
    }, []);

    const getVersion = async () => {
        const res = await api.getVersion()
        if (!res.code) {
            localStorage.setItem(LOCALSTORAGE_KEY.VERSION_INFO, JSON.stringify(res.data))
        }
    };
}

export default useVersion
