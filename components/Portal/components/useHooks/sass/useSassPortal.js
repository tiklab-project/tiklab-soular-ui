/**
 * @Author: mahai
 * @Description: Sass 版的项目版hooks
 * create: $2022/1/15
 */

import React from 'react';
import {getUser, removeUser, urlQuery, setCookie} from 'doublekit-core-ui'

const useSassPortal = (accUrl, urlSearch='', wechatApplicationType=undefined) =>  {
    const queryUrl = urlQuery(urlSearch);

    if (queryUrl && queryUrl.ticket) {
        if (wechatApplicationType) {
            setCookie("applicationType", wechatApplicationType)
        }
        for (let key in queryUrl) {
            setCookie(key, queryUrl[key]);
        }
    } else {
        if(!getUser().ticket) {
            removeUser()
            location.href = `${accUrl}/#/login?redirect=${location.href}`
        }
    }

}

export default useSassPortal;