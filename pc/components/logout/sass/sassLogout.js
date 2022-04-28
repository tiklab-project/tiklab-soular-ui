/**
 * @Author: mahai
 * @Description: Sass版本的退出
 * create: $2022/1/15
 */

import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";
import {LOGIN_STATUS} from "../../login";
import {loginOutSass} from "../../index";

function SassLogout(props) {
    const {portalLoginStore,authUrl} = props;
    const {logout} = portalLoginStore;

    useEffect(async () => {
        const user = getUser();
        if (user.ticket) {
            logout(user.ticket)
            loginOutSass(authUrl)
        }
    }, []);
    return (
        <div>退出登录...</div>
    );
}
export default inject(LOGIN_STATUS)(observer(SassLogout));