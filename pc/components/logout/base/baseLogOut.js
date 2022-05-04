/**
 * @Author: mahai
 * @Description: 社区版企业版的得出处理逻辑（本地退出和acc退出）
 * create: $2022/1/15
 */

import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import {LOGIN_STATUS} from "../../login";
import {loginOutAcc} from "../../index";
import {getUser, LOCALSTORAGE_KEY, urlQuery} from "doublekit-core-ui";


function BaseLogOut(props) {
    const {portalLoginStore, history} = props;
    const {logout} = portalLoginStore;
    useEffect(async () => {
        const user = getUser();
        const hash = location.hash;
        const query = urlQuery(hash);

        if (user.ticket) {
            logout(user.ticket)
        }
        if (query.redirect) {
            loginOutAcc(query.redirect,history);
        } else {
            const authConfig = localStorage.getItem(LOCALSTORAGE_KEY.AUTH_CONFIG) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.AUTH_CONFIG)) : {};
            if (authConfig.authType === 'acc') {
                loginOutAcc(authConfig.authUrl,history);
            } else {
                loginOutAcc(location.origin,history);
            }
        }
    }, [])
    return (
        <div>退出中 portal...</div>
    );
}
export default inject(LOGIN_STATUS)(observer(BaseLogOut));
