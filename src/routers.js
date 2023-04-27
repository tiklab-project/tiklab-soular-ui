import React from 'react';
import { Redirect } from 'react-router';
import {InternalWechatEntry, Logout} from 'tiklab-eam-ui'
import {LogTemplate} from "tiklab-security-ui";
import {NotFound} from "tiklab-privilege-ui"
import SyncComponent from './common/lazy/SyncComponent';

const Layout = SyncComponent(() => import('./common/layout/Layout'));

const Login = SyncComponent(() => import('./login/Login'))
const ExcludeProductUser = SyncComponent(() => import('./Login/ExcludeProductUser'))

/**
 * 首页工作台
 * @type {LazyComponent|*}
 */
// const Home = SyncComponent(() => import('./home'))
const Home = SyncComponent(() => import('./homePage/compontents/HomePage'))

const OplogFull = SyncComponent(()=>import('./homePage/compontents/OplogFull'))

/**
 * 系统设置
 * @type {LazyComponent|*}
 */
const SettingLayout = SyncComponent(()=> import('./setting/Navigator/setting'));
const OrgaManagement = SyncComponent(() => import('./setting/User/OrgaManagement'));
const UserManagement = SyncComponent(() => import('./setting/User/UserManagement'));
const PortalDirectory = SyncComponent(() => import('./setting/User/Directory'));
const UserGroupPage = SyncComponent(() => import('./setting/User/UserGroupPage'))
const SystemRole = SyncComponent(() => import('./setting/Privilege/SystemRolePage'));
const MessageSendType = SyncComponent(() => import('./setting/Message/MessageSendTypePage'));
const MessageManagement = SyncComponent(() => import('./setting/Message/Management'));
const PluginList = SyncComponent(() => import('./setting/Plugin/Plugin'))
const LogListPage = SyncComponent(()=> import('./setting/Secuity/LogList'))
const VersionPage = SyncComponent(() => import('./setting/Version'));
const ProductAuthPage =  SyncComponent(() => import('./setting/ProductAuth/ProductAuthPage'));

/**
 * 基础数据
 * @type {LazyComponent|*}
 */
const TodoTemplate = SyncComponent(()=> import('./setting/Base/Todo/todoTemp'));
const BaseTodoTypePage =  SyncComponent(()=> import('./setting/Base/Todo/todoTypePage'));
const BaseSystemFeature = SyncComponent(() => import('./setting/Base/Privilege/BaseSystemFeature'));
const BaseSystemRole = SyncComponent(() => import('./setting/Base/Privilege/BaseSystemRole'));
const BaseProjectFeature = SyncComponent(() => import('./setting/Base/Privilege/BaseProjectFeature'));
const BaseProjectRole = SyncComponent(() => import('./setting/Base/Privilege/BaseProjectRole'));
const BaseDomainRole = SyncComponent(() => import('./setting/Base/Privilege/BaseDomainRole'));
const MessageSendTypeBase = SyncComponent(() => import('./setting/Base/Message/MessageSendType'));
const MessageType = SyncComponent(() => import('./setting/Base/Message/MessageType'));
const BaseOplogTypePage = SyncComponent(() => import('./setting/Base/Secuity/oplogTypePage'));
const BaseMessageNoticePage = SyncComponent(() => import('./setting/Base/Message/MessageNoticePage'));
const BaseDomainUserPage = SyncComponent(() => import('./setting/Base/User/domainUserPage'));
const FormListPage = SyncComponent(() =>import('./setting/Base/Form/FormLisPage'))
const PreliminaryListPage = SyncComponent(() =>import('./setting/Base/Form/PreliminaryListPage'))
const PreliminaryTypeListPage = SyncComponent(() =>import('./setting/Base/Form/PreliminaryTypeListPage'))
const LinkFormDesign = SyncComponent(() =>import('./setting/Base/Form/LinkFormDesign'))


const routers = [
    {
        path: "/logout",
        exact: true,
        component: Logout
    },
    {
        component: Login,
        exact:true,
        path: '/Login'
    },
    {
        component: ExcludeProductUser,
        exact:true,
        path: "/no-auth"
    },
    {
        component:InternalWechatEntry,
        exact:true,
        path: '/project'
    },
    {
        component: Layout,
        key:'layout',
        path: '/',
        routes: [
            {
                component: Home,
                path:"/work",
                exact:true,
            },
            {
                component: OplogFull,
                path:"/dynamic",
                exact:true,
            },
            {
                path:"/404",
                exact:true,
                render: props =><NotFound {...props} homePath={'/404'}/>
            },
            {
                component: SettingLayout,
                path: "/setting",
                routes:[
                    {
                        component: OrgaManagement,
                        path:"/setting/orga",
                        exact:true,
                    },
                    {
                        component: UserManagement,
                        path:"/setting/user",
                        exact:true,
                    },
                    {
                        component: PortalDirectory,
                        path:"/setting/dir",
                        exact:true,
                    },
                    {
                        component: UserGroupPage,
                        path: "/setting/userGroup",
                        exact: true
                    },
                    {
                        component: SystemRole,
                        path:"/setting/permission",
                        exact:true,
                    },
                    {
                        component: MessageSendType,
                        path:"/setting/messagesendtype",
                        exact:true,
                    },
                    {
                        component: MessageManagement,
                        path:"/setting/Message",
                        exact:true,
                    },
                    {
                        component: PluginList,
                        path:"/setting/Plugin",
                        exact:true,
                    },
                    {
                        component: LogListPage,
                        path:"/setting/log",
                        exact:true,
                    },
                    {
                        component: VersionPage,
                        path:"/setting/Version",
                        exact:true,
                    },
                    {
                        component: ProductAuthPage,
                        path:"/setting/ProductAuth",
                        exact:true,
                    },

                    {
                        component: TodoTemplate,
                        path:"/setting/base/todotemplate",
                        exact:true,
                    },
                    {
                        component: BaseTodoTypePage,
                        path:"/setting/base/todotype",
                        exact:true,
                    },
                    {
                        component: LogTemplate,
                        path:"/setting/base/oplogtemplate",
                        exact:true,
                    },
                    {
                        component: BaseOplogTypePage,
                        path:"/setting/base/oplogtype",
                        exact:true,
                    },
                    {
                        component: BaseSystemFeature,
                        path:"/setting/base/systemfeature",
                        exact:true,
                    },
                    {
                        component: BaseSystemRole,
                        path:"/setting/base/systemrole",
                        exact:true,
                    },
                    {
                        component: BaseProjectFeature,
                        path:"/setting/base/projectfeature",
                        exact:true,
                    },
                    {
                        component: BaseProjectRole,
                        path:"/setting/base/projectrole",
                        exact:true,
                    },
                    {
                        component: MessageSendTypeBase,
                        path:"/setting/base/messagesendtype",
                        exact:true,
                    },
                    {
                        component: MessageType,
                        path:"/setting/base/messagetype",
                        exact:true,
                    },
                    {
                        component:BaseMessageNoticePage,
                        path:"/setting/base/messageNotice",
                        exact:true,
                    },
                    {
                        component: FormListPage,
                        path:"/setting/base/formList",
                        exact:true,
                    },
                    {
                        component: LinkFormDesign,
                        path:"/setting/base/formList/:id",
                        exact:true,
                    },
                    {
                        component: PreliminaryListPage,
                        path:"/setting/base/preliminaryList",
                        exact:true,
                    },

                    {
                        component: PreliminaryTypeListPage,
                        path:"/setting/base/preliminaryTypeList",
                        exact:true,
                    },
                    {
                        component: BaseDomainUserPage,
                        path:"/setting/base/domainUserList",
                        exact:true,
                    },
                    {
                        component: BaseDomainRole,
                        path:"/setting/base/domainRole",
                        exact:true,
                    },
                    {
                        path: "/setting/base/*",
                        render: ()=><Redirect to="/404"/>
                    },
                ]
            },
            {
                path:"/",
                exact:true,
                render:()=><Redirect to="/work"/>
            },
            {
                path: "*",
                render: ()=><Redirect to="/404"/>
            },
        ],
    },
]

export default routers;
