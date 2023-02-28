import React from 'react';
import { Redirect } from 'react-router';
import {InternalWechatEntry, Logout, Auth} from 'tiklab-eam-ui'

import SyncComponent from './common/lazy/SyncComponent';
import {LogTemplate} from "tiklab-security-ui";

const layout = SyncComponent(() => import('./common/layout/layout'));

// 设置layout
const SettingLayout = SyncComponent(()=> import('./Setting/contains'));
//部门
const OrgaManagement = SyncComponent(() => import('./Setting/User/OrgaManagement'));
// 用户
const UserManagement = SyncComponent(() => import('./Setting/User/UserManagement'));
// 用户目录
const PortalDirectory = SyncComponent(() => import('./Setting/User/Directory'));
// 用户组
const UserGroupPage = SyncComponent(() => import('./Setting/User/UserGroupPage'))

// 权限
const SystemRole = SyncComponent(() => import('./Setting/Privilege/SystemRolePage'));
// 消息发送方式
const MessageSendType = SyncComponent(() => import('./Setting/Message/MessageSendTypePage'));
// 消息通知
const MessageManagement = SyncComponent(() => import('./Setting/Message/Management'));
// 插件
const PluginList = SyncComponent(() => import('./Setting/Plugin'))
// 操作日志
const LogListPage = SyncComponent(()=> import('./Setting/Secuity/LogList'))
// 版本与许可证
// const Version = SyncComponent(()=> import('./Setting/oplog/logList'))

// 基础数据
// 待办模板
const TodoTemplate = SyncComponent(()=> import('./Setting/Base/Todo/todoTemp'));

const BaseTodoTypePage =  SyncComponent(()=> import('./Setting/Base/Todo/todoTypePage'));
//系统功能
const BaseSystemFeature = SyncComponent(() => import('./Setting/Base/Privilege/BaseSystemFeature'));
const BaseSystemRole = SyncComponent(() => import('./Setting/Base/Privilege/BaseSystemRole'));
//项目功能点
const BaseProjectFeature = SyncComponent(() => import('./Setting/Base/Privilege/BaseProjectFeature'));
const BaseProjectRole = SyncComponent(() => import('./Setting/Base/Privilege/BaseProjectRole'));
const BaseDomainRole = SyncComponent(() => import('./Setting/Base/Privilege/BaseDomainRole'));

// 消息发送方式
const MessageSendTypeBase = SyncComponent(() => import('./Setting/Base/Message/MessageSendType'));
// 消息类型
const MessageType = SyncComponent(() => import('./Setting/Base/Message/MessageType'));
const BaseOplogTypePage = SyncComponent(() => import('./Setting/Base/Secuity/oplogTypePage'));
//消息通知方案
const BaseMessageNoticePage = SyncComponent(() => import('./Setting/Base/Message/MessageNoticePage'));

const BaseDomainUserPage = SyncComponent(() => import('./Setting/Base/User/domainUserPage'));

// 版本
const VersionPage = SyncComponent(() => import('./Setting/Version'));

const Home = SyncComponent(() => import('./Home'))
const Login = SyncComponent(() => import('./Login/Login'))


// Form
const FormListPage = SyncComponent(() =>import('./Setting/Base/Form/FormLisPage'))
const PreliminaryListPage = SyncComponent(() =>import('./Setting/Base/Form/PreliminaryListPage'))
const PreliminaryTypeListPage = SyncComponent(() =>import('./Setting/Base/Form/PreliminaryTypeListPage'))
const LinkFormDesign = SyncComponent(() =>import('./Setting/Base/Form/LinkFormDesign'))


const selectionRouter = () => {
    const devRouter = [
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
            component: Auth,
            exact:true,
            path: '/auth_result'
        },
        {
            component:InternalWechatEntry,
            exact:true,
            path: '/project'
        },
        {
            component: layout,
            key:'layout',
            path: '/',
            routes: [
                {
                    component: Home,
                    path:"/work",
                    exact:true,
                },

                {
                    component: SettingLayout,
                    path: "/Setting",
                    routes:[
                        {
                            component: OrgaManagement,
                            path:"/Setting/orga",
                            exact:true,
                        },
                        {
                            component: UserManagement,
                            path:"/Setting/User",
                            exact:true,
                        },
                        {
                            component: PortalDirectory,
                            path:"/Setting/dir",
                            exact:true,
                        },
                        {
                            component: UserGroupPage,
                            path: "/Setting/userGroup",
                            exact: true
                        },
                        {
                            component: SystemRole,
                            path:"/Setting/permission",
                            exact:true,
                        },
                        {
                            component: MessageSendType,
                            path:"/Setting/messagesendtype",
                            exact:true,
                        },
                        {
                            component: MessageManagement,
                            path:"/Setting/Message",
                            exact:true,
                        },

                        {
                            component: PluginList,
                            path:"/Setting/Plugin",
                            exact:true,
                        },
                        {
                            component: LogListPage,
                            path:"/Setting/log",
                            exact:true,
                        },
                        {
                            component: VersionPage,
                            path:"/Setting/Version",
                            exact:true,
                        },
                        {
                            component: TodoTemplate,
                            path:"/Setting/Base/todotemplate",
                            exact:true,
                        },
                        {
                            component: BaseTodoTypePage,
                            path:"/Setting/Base/todotype",
                            exact:true,
                        },
                        {
                            component: LogTemplate,
                            path:"/Setting/Base/oplogtemplate",
                            exact:true,
                        },
                        {
                            component: BaseOplogTypePage,
                            path:"/Setting/Base/oplogtype",
                            exact:true,
                        },
                        {
                            component: BaseSystemFeature,
                            path:"/Setting/Base/systemfeature",
                            exact:true,
                        },
                        {
                            component: BaseSystemRole,
                            path:"/Setting/Base/systemrole",
                            exact:true,
                        },
                        {
                            component: BaseProjectFeature,
                            path:"/Setting/Base/projectfeature",
                            exact:true,
                        },
                        {
                            component: BaseProjectRole,
                            path:"/Setting/Base/projectrole",
                            exact:true,
                        },
                        {
                            component: MessageSendTypeBase,
                            path:"/Setting/Base/messagesendtype",
                            exact:true,
                        },
                        {
                            component: MessageType,
                            path:"/Setting/Base/messagetype",
                            exact:true,
                        },
                        {
                            component:BaseMessageNoticePage,
                            path:"/Setting/Base/messageNotice",
                            exact:true,
                        },
                        {
                            component: FormListPage,
                            path:"/Setting/Base/formList",
                            exact:true,
                        },
                        {
                            component: LinkFormDesign,
                            path:"/Setting/Base/formList/:id",
                            exact:true,
                        },
                        {
                            component: PreliminaryListPage,
                            path:"/Setting/Base/preliminaryList",
                            exact:true,
                        },

                        {
                            component: PreliminaryTypeListPage,
                            path:"/Setting/Base/preliminaryTypeList",
                            exact:true,
                        },
                        {
                            component: BaseDomainUserPage,
                            path:"/Setting/Base/domainUserList",
                            exact:true,
                        },
                        {
                            component: BaseDomainRole,
                            path:"/Setting/Base/domainRole",
                            exact:true,
                        },
                        {
                            path: "/Setting",
                            exact: true,
                            render: ()=><Redirect to="/setting/orga"/>
                        },

                    ]
                },
                {
                    path:"/",
                    exact:true,
                    render:()=><Redirect to="/work"/>
                },
            ],
        },
    ];
    const routes = [
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
            component: Auth,
            exact:true,
            path: '/auth_result'
        },
        {
            component:InternalWechatEntry,
            exact:true,
            path: '/project'
        },
        {
            component: layout,
            key:'layout',
            path: '/',
            routes: [
                {
                    component: Home,
                    path:"/work",
                    exact:true,
                },

                {
                    component: SettingLayout,
                    path: "/Setting",
                    routes:[
                        {
                            component: OrgaManagement,
                            path:"/Setting/orga",
                            exact:true,
                        },
                        {
                            component: UserManagement,
                            path:"/Setting/User",
                            exact:true,
                        },
                        {
                            component: PortalDirectory,
                            path:"/Setting/dir",
                            exact:true,
                        },
                        {
                            component: UserGroupPage,
                            path: "/Setting/userGroup",
                            exact: true
                        },
                        {
                            component: SystemRole,
                            path:"/Setting/permission",
                            exact:true,
                        },
                        {
                            component: MessageSendType,
                            path:"/Setting/messagesendtype",
                            exact:true,
                        },
                        {
                            component: MessageManagement,
                            path:"/Setting/Message",
                            exact:true,
                        },

                        {
                            component: PluginList,
                            path:"/Setting/Plugin",
                            exact:true,
                        },
                        {
                            component: LogListPage,
                            path:"/Setting/log",
                            exact:true,
                        },
                        {
                            component: VersionPage,
                            path:"/Setting/Version",
                            exact:true,
                        },

                        {
                            path: "/Setting",
                            exact: true,
                            render: ()=><Redirect to="/setting/orga"/>
                        },
                    ]
                },
                {
                    path:"/",
                    exact:true,
                    render:()=><Redirect to="/work"/>
                },
            ],
        },
    ];

    return dev_production ? devRouter : routes
}
export default selectionRouter()
