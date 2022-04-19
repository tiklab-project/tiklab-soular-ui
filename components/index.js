/**
 * @name: index
 * @author: mahai
 * @date: 2021-09-01 18:21
 * @description：index
 * @update: 2021-09-01 18:21
 */
import {ProjectLogin, PortalLogin, LOGIN_STATUS, LoginStore} from "./login";

import {
    SaasPortal,
    useSassPortal,
    useBasePortal,
    loginOutSass,
    loginOutAcc,
    loginOutLocal
} from './Portal'

import {BaseLogOut, SassLogout} from './logout';

import LoginElectron from './electron/login'
import PortalElectron from './electron/portal'

import {portal_cn} from './language'
import {useAccountConfig, useVersion} from './hooks';

import PortalRouter from './modules/routers';
import PortalStore from './modules/stores';


export {
    LoginElectron,
    PortalElectron,
    ProjectLogin,
    PortalLogin,
    SaasPortal,
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

    // 给企业版门户使用
    PortalRouter,
    PortalStore
}
