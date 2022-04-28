/**
 * @name: dist
 * @author: mahai
 * @date: 2021-05-30 10:25
 * @description：打包的文件
 * @update: 2021-05-30 10:25
 */


import { privilegeStores } from 'doublekit-privilege-ui';
import { LoginStore, Portal } from 'doublekit-frame-ui';
import {MenuList} from 'doublekit-privilege-ui';
import { orgStores } from 'doublekit-user-ui';
import { messageModuleStores } from 'doublekit-message-ui';
import resources from './common/language/resources';
import routes from './routers';
import { stores } from '../components/modules/stores';


const portalStore = {
    ...stores,
    ...privilegeStores,
    ...LoginStore,
    ...orgStores,
    ...messageModuleStores,
}
const portalRoutes = routes;
const portalResources = resources;

export {
    portalStore,
    portalRoutes,
    portalResources,
    MenuList,
    Portal
}
