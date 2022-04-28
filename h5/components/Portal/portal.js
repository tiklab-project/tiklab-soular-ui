/**
 * @name: portal
 * @author mahai
 * @date 2022/3/22 2:29 PM
 * @description portal
 */

import React from 'react';
import {urlQuery, saveUser, setCookie} from "doublekit-core-ui"

const SassPortal = (props) => {
    const {redirect = '/login', location,  portalLoginStore, history, accUrl, wechatApplicationType=undefined} = props;
    const { isLogin } = portalLoginStore;

    const query = urlQuery(location.search);
    if (wechatApplicationType) {
        setCookie("applicationType", wechatApplicationType)
    }
    if (query.ticket && query.userId && query.name && query.phone && query.email) {
        saveUser(query)
        return window.location.href =  window.location.origin
    }

    if (!isLogin) {
        if (accUrl) {
            return window.location.href =  `${accUrl}/#/login?redirect=${window.location.origin}`
        } else {
            history.push(redirect)
        }
    }

    return (
        <>
            {props.children}
        </>
    )
};

export default SassPortal;
