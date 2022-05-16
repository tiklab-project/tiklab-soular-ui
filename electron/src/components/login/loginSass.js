/**
 * @name: index
 * @author: mahai
 * @date: 2021-10-08 13:25
 * @description：index
 * @update: 2021-10-08 13:25
 */
import React, { useEffect } from 'react'
import {setCookie, saveUser} from 'doublekit-core-ui'
import {ElectronSassLogin, } from 'doublekit-eam-ui';
import thirdApi from './thirdApi';
import {message} from "antd";

const { ipcRenderer } = window.require('electron')


const LoginSassPage = (props) => {

    useEffect( () => {
        ipcRenderer.on("thirdLoginParams", (event, fileContents) => {
            if (fileContents.auth_code && fileContents.appid && fileContents.state === "portal_wechat_scan"){
                qyWechatScan(fileContents)
            }
        });
        return () => {
            ipcRenderer.removeAllListeners("thirdLoginParams")
        }
    }, []);


    const electronWeChatQR = (url) => {
        if (url){
            ipcRenderer.send('login-window', {url:url, type: "portal_sass_wechat"})
        }
    }

    // 企业微信服务商扫码登录
    const qyWechatScan = async (query) => {
        const response = await thirdApi.wechatInfoForQrcode(query.auth_code);
        if (!response.code) {
            const {data} = response || {}
            const tenantResponse = await getTenantByCorpId(data.corpid);
            if (!tenantResponse.code) {
                const axiosHeader = {
                    tenant: tenantResponse.data.id
                }
                const ticketResponse = await thirdApi.wechatScanLoginForUserId(data.userId, axiosHeader);
                if (!ticketResponse.code) {
                    setCookie('corpid', data.corpid)
                    setCookie('tenant', tenantResponse.data.id)
                    saveUser(ticketResponse.data)
                    props.history.push('/')
                } else {
                    return message.error('登录失败')
                }
            } else {
                return message.error('没有订阅，或者没有查询到该租户信息')
            }
        } else {
            return message.error('企业微信认证失败')
        }
    }

    // 查询企业租户id
    const getTenantByCorpId = async (id) => {
        return await thirdApi.getTenantByCorpId(id)
    }

    return (
        <ElectronSassLogin
            {...props}
            electronWeChatQR={electronWeChatQR}
        />
    )
}
export default LoginSassPage
