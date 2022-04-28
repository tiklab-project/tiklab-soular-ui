/**
 * @name: index
 * @author mahai
 * @date 2022/3/22 2:28 PM
 * @description index
 */

import Login from './Login/Login';
import Logout from './Logout/logout';
import SassPortal from './Portal/portal';
import Wechat from "./wechat/wechat";
import {LOGIN_STATUS, LoginStore} from './store'
import {loginOutSass, loginOutAcc, loginOutLocal,} from './utils/logoutFunction';
import verifyUserSaasHOC from './HOC/verifyUserSassHOC'
export {
    Login,
    Logout,
    SassPortal,
    Wechat,
    LOGIN_STATUS,
    LoginStore,
    loginOutSass,
    loginOutAcc,
    loginOutLocal,
    verifyUserSaasHOC
}
