/**
 * @Author: mahai
 * @Description: 社区版企业版的得出处理逻辑（本地退出和acc退出）
 * create: $2022/1/15
 */

import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import {LOGIN_STATUS} from "../../login";
import {loginOutAcc, loginOutLocal} from "../../index";
import {getUser} from "doublekit-core-ui";


function BaseLogOut(props) {
    const {portalLoginStore, authConfig, history, localLogin='/login'} = props;
    const {logout} = portalLoginStore;
    useEffect(async () => {
        const user = getUser();
        if (authConfig) {
            if (authConfig.authType === 'acc') {
                if (user.ticket) {
                    logout(user.ticket)
                }
                loginOutAcc(authConfig.authUrl,history);
            } else {
               await loginOutLocal(history, portalLoginStore, localLogin, authConfig.search)
            }
        }
    }, [authConfig])
    return (
        <div>退出中 portal...</div>
    );
}
export default inject(LOGIN_STATUS)(observer(BaseLogOut));
