/**
 * @Author: mahai
 * @Description: 社区版和企业版通用的门户 hooks
 * create: $2022/1/15
 */

import React, {useEffect, useState} from 'react';
import {getUser, saveUser} from 'doublekit-core-ui'
import {parseSearch} from "../../../../utils";
import useAccountConfig from "../../../../hooks/useAccountConfig";
import Api from "../../../../login/api";
import {message} from "antd";

/**
 *
 * @param portalLoginStore
 * @param history
 * @param redirect 本地重定向页面
 */
const useBasePortal = (portalLoginStore, history, redirect) => {
    const user = parseSearch(window.location.search);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const redirect = localStorage.getItem('redirect');
        if (user.state === "wechat" || user.appid) {
            // 企业微信扫码登录返回的数据
            Api.getConfByRelDirectoryId('4').then(res => {
                if (!res.code){
                    const wechatCfg = res.data;
                    const params = {
                        code: user.code,
                        corpsecret: wechatCfg.corpsecret,
                        corpid: wechatCfg.corpid
                    }
                    Api.wechatLogin(params).then(res => {
                        if (res.code) {
                            const url = window.location.origin + '/#/login';
                            window.location.href = url
                        } else {
                            saveUser(res.data)
                            setLoading(false)
                            if (redirect) {
                                localStorage.removeItem('redirect');
                                window.location.href= `${redirect}?email=${res.data.email}&name=${res.data.name}&ticket=${res.data.ticket}&phone=${res.data.phone}&userId=${res.data.userId}`
                            } else {
                                const url = window.location.origin + '/' + window.location.hash
                                window.location.href = url
                            }
                        }
                    })
                }
            })
        } else {
            if (user.code) {
                // 钉钉
                Api.getConfByRelDirectoryId('3').then(res => {
                    if (!res.code){
                        const params = {
                            code:user.code,
                            appKey:res.data.appKey,
                            appSecret:res.data.appSecret,
                            url:res.data.url
                        }
                        Api.dingDingLogin(params).then(res => {
                            if (res.code) {
                                const url = window.location.origin + '/#/login';
                                window.location.href = url
                            } else {
                                if (res.data) {
                                    saveUser(res.data)
                                    setLoading(false)
                                    if (redirect) {
                                        localStorage.removeItem('redirect');
                                        window.location.href= `${redirect}?email=${res.data.email}&name=${res.data.name}&ticket=${res.data.ticket}&phone=${res.data.phone}&userId=${res.data.userId}`
                                    } else {
                                        const url = window.location.origin + '/' + window.location.hash
                                        window.location.href = url
                                    }
                                } else {
                                    message.error('没有同步到该钉钉用户')
                                    history.push('/login')
                                }
                            }
                        })
                    }
                })
            }

        }
        // 门户中心返回数据
        if (user.ticket) {
            saveUser(user)
            const url = window.location.origin + '/' + window.location.hash
            window.location.href = url
        }
    }, []);

    const authData = useAccountConfig();
    useEffect(() => {
        // 没有用户数据
        if (!getUser().ticket) {
            if (authData.authType === 'acc') {
                const url =`${authData.authUrl}/#/logout?redirect=${window.location.origin}`
                window.location.href = url
            } else {
                // if (!user.state || user.code) {
                if (!user.code) {
                    history.push(redirect)
                }
            }
        }
    }, [authData])


    if (loading) {
        return <div>加载中。。。</div>
    }

}

export default useBasePortal;
