/**
 * @name: useAccountConfig
 * @author: mahai
 * @date: 2021-07-05 09:23
 * @description：获取系统配置的登录方式
 * @update: 2021-07-05 09:23
 */
import React, {useState, useEffect} from 'react';
import api from "../login/api";

const useAccountConfig = () => {
    const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('authConfig')) || {})
    useEffect(async () => {
        await getProjectAuthentication()
        return () => {
            setAuthData({})
        }
    }, []);

    // 获取登录配置数据
    const getProjectAuthentication = async () => {
        const res = await api.authConfig()
        if (!res.code) {
            localStorage.setItem('authConfig', JSON.stringify(res.data))
            setAuthData(res.data)
        }
    }

    return authData
}

export default useAccountConfig
