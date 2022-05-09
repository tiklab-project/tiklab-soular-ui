/**
 * @name: index
 * @author: mahai
 * @date: 2021-09-01 18:21
 * @description：index
 * @update: 2021-09-01 18:21
 */
import {Login, LOGIN_STATUS, LoginStore, ProjectElectronLogin, ProjectElectronSassLogin} from "./login";

import {
    SaasPortal,
    loginOutAcc,
} from './Portal'

import {BaseLogOut} from './logout';

import {portal_cn} from './language'
import {useAccountConfig, useVersion, useSaSSVersion} from './hooks';

import PortalRouter from './modules/routers';
import PortalStore from './modules/stores';

import verifyUserHOC from './HOC/VaildUserHOC'
import verifyUserSaasHOC from './HOC/verifyUserSassHOC'
import {ProjectWechat} from './modules'
import SassWechatEntry from './sassWechat/sassWechatEntry'
export {
    Login,
    SaasPortal,
    ProjectElectronLogin,
    ProjectElectronSassLogin,
    LOGIN_STATUS,
    LoginStore,
    portal_cn,

    BaseLogOut,

    loginOutAcc,

    useAccountConfig,
    useVersion,
    useSaSSVersion,

    // 给企业版门户使用
    PortalRouter,
    PortalStore,

    verifyUserHOC,
    verifyUserSaasHOC,
    ProjectWechat,
    SassWechatEntry
}
