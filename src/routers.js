import React from 'react';
import { Redirect } from 'react-router';
import SyncComponent from './common/lazy/SyncComponent';

const Layout = SyncComponent(() => import('./common/layout/Layout'));

const Login = SyncComponent(() => import('./login/Login'))
const ExcludeProductUser = SyncComponent(() => import('./Login/ExcludeProductUser'))
const Logout=SyncComponent(()=>import("./login/Logout"))
const Wechat=SyncComponent(()=>import("./login/Wechat"))

const NotFound = SyncComponent(()=>import('./setting/Privilege/NotFound'))

/**
 * 首页工作台
 * @type {LazyComponent|*}
 */
const Home = SyncComponent(() => import('./home/compontents/HomePage'))

/**
 * 用户管理
 */
const UserLayout = SyncComponent(()=>import('./user/navigator/UserAside'))
const OrgaManagement = SyncComponent(() => import('./user/user/OrgaManagement'));
const UserManagement = SyncComponent(() => import('./user/user/UserManagement'));
const PortalDirectory = SyncComponent(() => import('./user/user/Directory'));
const UserGroupPage = SyncComponent(() => import('./user/user/UserGroupPage'))


/**
 * 系统设置
 */
const Setting = SyncComponent(()=> import('./setting/Navigator/setting'));
const MessageSendType = SyncComponent(() => import('./setting/Message/MessageSendTypePage'));
const MessageManagement = SyncComponent(() => import('./setting/Message/Management'));
const PluginList = SyncComponent(() => import('./setting/Plugin/Plugin'))
const VersionPage = SyncComponent(() => import('./setting/Version'));
const SystemRole = SyncComponent(() => import('./setting/Privilege/SystemRolePage'));

const LogListPage = SyncComponent(()=> import('./setting/Secuity/LogList'))
const DataImport = SyncComponent(()=>import('./setting/integration/dataImport/components/DataImport'))

const BackupRecovery = SyncComponent(()=>import('./setting/Secuity/BackupRecovery'))


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
const BaseLogTemplate = SyncComponent(()=>import('./setting/Base/Secuity/LogTemplate'))

const routers = [
    {
        path: "/logout",
        exact: true,
        component: Logout
    },
    {
        component: Login,
        exact:true,
        path: '/login'
    },
    {
        component: ExcludeProductUser,
        exact:true,
        path: "/no-auth"
    },
    {
        component:Wechat,
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
                path:"/404",
                exact:true,
                render: props =><NotFound {...props} homePath={'/404'}/>
            },
            {
                component: UserLayout,
                path: "/user",
                routes: [
                    {
                        component: OrgaManagement,
                        path:"/user/orga",
                        exact:true,
                    },
                    {
                        component: UserManagement,
                        path:"/user/user",
                        exact:true,
                    },
                    {
                        component: PortalDirectory,
                        path:"/user/dir",
                        exact:true,
                    },
                    {
                        component: UserGroupPage,
                        path: "/user/userGroup",
                        exact: true
                    },
                ]
            },
            {
                component: Setting,
                path: "/setting",
                routes:[
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
                        component: DataImport,
                        path:"/setting/data_import",
                        exact:true,
                    },
                    {
                        component: BackupRecovery,
                        path:"/setting/backups",
                        exact:true,
                    },
                    {
                        component: VersionPage,
                        path:"/setting/Version",
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
                        component: BaseLogTemplate,
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
                        path: "/setting/*",
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
                path:"*",
                render:()=><Redirect to="/404"/>
            },
        ]
    }
]

export default routers;
