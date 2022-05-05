/**
 * @name: ProjectWechat
 * @author mahai
 * @date 2022/4/28 11:29 AM
 * @description 企业微信内部应用中的项目管理
 */
import React, {useEffect} from 'react';
import {saveUser, urlQuery, setCookie, LOCALSTORAGE_KEY} from 'doublekit-core-ui';
import InternalWechatService from './service/workService';
import Api from "../../login/api";

const ProjectWechat = props => {
    const query = urlQuery(location.search);
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
                        if (query.state === "internal_portal") {
                            saveUser(res.data)
                            setCookie('loginType',query.state)
                            history.push('/')
                        } else {
                            switch (query.state) {
                                case "internal_project": {
                                    return window.location.href= `http://192.168.10.9?email=${res.data.email}&name=${res.data.name}&ticket=${res.data.ticket}&phone=${res.data.phone}&userId=${res.data.userId}`
                                }
                            }
                        }

                    }
                })
            }
        })

    },[]);

    const getProjectAuthentication = async () => {
        const res = await Api.authConfig()
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

export default ProjectWechat
