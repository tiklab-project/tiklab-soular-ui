/**
 * @name: index
 * @author: mahai
 * @date: 2021-10-08 13:25
 * @description：index
 * @update: 2021-10-08 13:25
 */
import React, { useEffect } from 'react'
// import {ipcRenderer} from 'electron';
import {observer, inject} from "mobx-react";
import {setCookie, saveUser} from 'doublekit-core-ui'
import {ProjectElectronLogin, LOGIN_STATUS, } from 'doublekit-portal-ui';
import thirdApi from './thirdApi';

const { ipcRenderer } = window.require('electron')


const LoginPage = (props) => {

    useEffect(() => {
        ipcRenderer.on("thirdLoginParams", (event, fileContents) => {
            if (fileContents.code && fileContents.state === "dingDingScan"){
                authDingDingLogin(fileContents.code)
            }
            if (fileContents.code && fileContents.state === "wechatScan"){
                authWechatLogin(fileContents.code)
            }
        });
        return () => {
            ipcRenderer.removeAllListeners("thirdLoginParams")
        }
    }, []);


    const electronDingDingQR = (url) => {
        if (url){
            ipcRenderer.send('login-window', {url:url, type: "dingding"})
        }
    }

    const electronWeChatQR = (url) => {
        if (url){
            ipcRenderer.send('login-window', {url:url, type: "wechat"})
        }
    }


    const authWechatLogin = (code) => {
        thirdApi.getConfByRelDirectoryId('4').then(res => {
            if (!res.code){
                const wechatCfg = res.data;
                const params = {
                    code: code,
                    corpsecret: wechatCfg.corpsecret,
                    corpid: wechatCfg.corpid
                }
                thirdApi.wechatLogin(params).then(wechatUser => {
                    if (wechatUser.code !== 0) {
                        // 请求错误
                    } else {
                        if (wechatUser.data) {
                            setCookie('loginType',"wechatQR")
                            saveUser(wechatUser.data);
                            props.history.push('/')
                        }
                    }
                })
            }
        })
    }
    /**
     * 根据主进程拿到钉钉的临时code请求数据
     */
    const authDingDingLogin = (code) => {
        thirdApi.getConfByRelDirectoryId('3').then(res => {
            const params = {
                code:code,
                appKey:res.data.appKey,
                appSecret:res.data.appSecret,
                url:res.data.url
            }
            thirdApi.dingDingLogin(params).then(userRes => {
                if (userRes.code !== 0) {
                    // 请求错误
                } else {
                    if (userRes.data) {
                        setCookie('loginType',"dingdingQR")
                        saveUser(userRes.data);
                        props.history.push('/')
                    }
                }
            })
        })
    }
    return (
        <ProjectElectronLogin
            {...props}
            electronDingDingQR={electronDingDingQR}
            electronWeChatQR={electronWeChatQR}
        />
    )
}
export default inject(LOGIN_STATUS)(observer(LoginPage))
