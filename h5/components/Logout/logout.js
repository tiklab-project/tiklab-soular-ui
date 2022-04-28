/**
 * @name: logOut
 * @author: mahai
 * @date: 2021-07-05 14:32
 * @description：logOut
 * @update: 2021-07-05 14:32
 */
import React, {useEffect} from 'react';
import {getUser, urlQuery} from 'doublekit-core-ui'
import {inject, observer} from "mobx-react";
import {LOGIN_STATUS} from '../store'


const LogOut = props => {
    const {portalLoginStore, authConfig, history, localLogin='/login'} = props;
    const {logout} = portalLoginStore;

    const user = getUser();
    const query = urlQuery(location.hash);
    useEffect(( ) => {

        (async () => {
            if (query.redirect) {
                const loutData = await logout(user.ticket)
                if (!loutData.code) {
                    location.href = `${window.location.origin}/#/login?redirect=${query.redirect || window.location.origin}`
                } else {
                    location.href = `${window.location.origin}/#/login?redirect=${query.redirect || window.location.origin}`
                }
            } else {
                const loutData = await logout(user.ticket)
                if (!loutData.code) {
                    history.push(localLogin)
                }
            }
        })()

    }, [authConfig])

    return (
        <div>退出中...</div>
    )
}

export default inject(LOGIN_STATUS)(observer(LogOut));
