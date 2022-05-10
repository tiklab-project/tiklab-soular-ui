/**
 * @name: ProjectWechat
 * @author mahai
 * @date 2022/4/28 11:29 AM
 * @description 企业微信内部应用中的项目管理
 */
import React, {useEffect} from 'react';
import {saveUser, urlQuery, setCookie, LOCALSTORAGE_KEY} from 'doublekit-core-ui';
import InternalWechatService from './service/workService';
import AccountApi from "../service/accountApi";

const ProjectWechatCE = props => {
    const query = urlQuery(window.location.href);
    const {history, corpid, corpsecret} = props;
    useEffect(() => {
        getProjectAuthentication().then(authData=>{
            if (authData.authType === 'acc') {
                if (corpid && corpsecret) {
                    const params = {
                        code: query.code,
                        corpid,
                        corpsecret
                    }
                    InternalWechatService.internalWechatAccLogin(params).then(res => {
                        if (!res.code) {
                            saveUser(res.data)
                            setCookie('loginType',query.state)
                            history.push('/')
                        }
                    })
                }

            } else {
                InternalWechatService.internalWechatLogin(query.code).then(res => {
                    if (!res.code) {
                        saveUser(res.data)
                        setCookie('loginType',query.state)
                        history.push('/')
                    }
                })
            }
        })

    },[]);

    const getProjectAuthentication = async () => {
        const res = await AccountApi.authConfig()
        if (!res.code) {
            try {
                const authData = {...res.data, authUrl:acc_url}
                localStorage.setItem(LOCALSTORAGE_KEY.AUTH_CONFIG, JSON.stringify(authData))
                return authData
            } catch (e) {
                localStorage.setItem(LOCALSTORAGE_KEY.AUTH_CONFIG, JSON.stringify(res.data))
                return res.data
            }
        }

    }

    return(
        <div>
            登录中
        </div>
    )
};

export default ProjectWechatCE
