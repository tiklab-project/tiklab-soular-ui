/**
 * @name: index
 * @author: mahai
 * @date: 2021-09-01 18:21
 * @description：index
 * @update: 2021-09-01 18:21
 */
import {ProjectLogin, PortalLogin, LOGIN_STATUS, LoginStore, ProjectElectronLogin} from "./login";

import {
    SaasPortal,
    useSassPortal,
    useBasePortal,
    loginOutSass,
    loginOutAcc,
    loginOutLocal
} from './Portal'

import {BaseLogOut, SassLogout} from './logout';

import {portal_cn} from './language'
import {useAccountConfig, useVersion, useSaSSVersion} from './hooks';

import PortalRouter from './modules/routers';
import PortalStore from './modules/stores';

import verifyUserHOC from './HOC/VaildUserHOC'
import verifyUserSaasHOC from './HOC/verifyUserSassHOC'
import {ProjectWechat} from './modules'
export {
    ProjectLogin,
    PortalLogin,
    SaasPortal,
    ProjectElectronLogin,
    LOGIN_STATUS,
    LoginStore,
    portal_cn,

    BaseLogOut,
    SassLogout,

    loginOutSass,
    loginOutAcc,
    loginOutLocal,

    // hooks
    useSassPortal,
    useBasePortal,
    useAccountConfig,
    useVersion,
    useSaSSVersion,

    // 给企业版门户使用
    PortalRouter,
    PortalStore,

    verifyUserHOC,
    verifyUserSaasHOC,
    ProjectWechat
}
