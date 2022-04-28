/**
 * @name: ProjectWechat
 * @author mahai
 * @date 2022/4/28 11:29 AM
 * @description 企业微信内部应用中的项目管理
 */
import React, {useEffect} from 'react';
import {saveUser, urlQuery} from 'doublekit-core-ui';
import {inject, observer} from 'mobx-react'
import InternalWechatService from './service/workService';
import {LOGIN_STATUS} from "../../login";

const ProjectWechat = props => {
    const query = urlQuery(location.search);
    const {portalLoginStore, history} = props;
    useEffect(() => {
        InternalWechatService.internalWechatLogin(query.code).then(res => {
            if (!res.code) {
                saveUser(res.data)
                portalLoginStore.login(res.data)
                history.push('/')
            }
        })
    },[]);
    return(
        <div>
            登录中
        </div>
    )
};

export default inject(LOGIN_STATUS)(observer(ProjectWechat))
