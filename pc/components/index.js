/**
 * @name: index
 * @author: mahai
 * @date: 2021-09-01 18:21
 * @description：index
 * @update: 2021-09-01 18:21
 */

import {
    loginOutAcc,
} from './Portal'



import PortalRouter from './modules/routers';
import PortalStore from './modules/stores';

export {
    loginOutAcc,
    // 给企业版门户使用
    PortalRouter,
    PortalStore,
}
