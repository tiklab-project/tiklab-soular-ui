import React from 'react';
import { Redirect } from 'react-router';
import {InternalWechatEntry, Logout, Auth} from 'tiklab-eam-ui'

import SyncComponent from './common/lazy/SyncComponent';
import {LogTemplate} from "tiklab-security-ui";

const layout = SyncComponent(() => import('./common/layout/layout'));

// 设置layout
const SettingLayout = SyncComponent(()=> import('./setting/contains'));
//部门
const OrgaManagement = SyncComponent(() => import('./setting/user/orgaManagement'));
// 用户
const UserManagement = SyncComponent(() => import('./setting/user/userManagement'));
// 用户目录
const PortalDirectory = SyncComponent(() => import('./setting/user/portalDirectory'));
// 用户组
const UserGroupPage = SyncComponent(() => import('./setting/user/userGroupPage'))

// 权限
const SystemRole = SyncComponent(() => import('./setting/privilege/systemRole'));
// 消息发送方式
const MessageSendType = SyncComponent(() => import('./setting/message/messageSendType'));
// 消息通知
const MessageManagement = SyncComponent(() => import('./setting/message/management'));
// 插件
const PluginList = SyncComponent(() => import('./setting/plugin'))
// 操作日志
const LogListPage = SyncComponent(()=> import('./setting/secuity/logList'))
// 版本与许可证
// const Version = SyncComponent(()=> import('./setting/oplog/logList'))

// 基础数据
// 待办模板
const TodoTemplate = SyncComponent(()=> import('./setting/base/todo/todoTemp'));

const BaseTodoTypePage =  SyncComponent(()=> import('./setting/base/todo/todoTypePage'));
//系统功能
const BaseSystemFeature = SyncComponent(() => import('./setting/base/privilege/baseSystemFeature'));
const BaseSystemRole = SyncComponent(() => import('./setting/base/privilege/baseSystemRole'));
//项目功能点
const BaseProjectFeature = SyncComponent(() => import('./setting/base/privilege/baseProjectFeature'));
const BaseProjectRole = SyncComponent(() => import('./setting/base/privilege/baseProjectRole'));
const BaseDomainRole = SyncComponent(() => import('./setting/base/privilege/baseDomainRole'));

// 消息发送方式
const MessageSendTypeBase = SyncComponent(() => import('./setting/base/message/messageSendType'));
// 消息类型
const MessageType = SyncComponent(() => import('./setting/base/message/messageType'));
const BaseOplogTypePage = SyncComponent(() => import('./setting/base/secuity/oplogTypePage'));
//消息通知方案
const BaseMessageNoticePage = SyncComponent(() => import('./setting/base/message/messageNoticePage'));

const BaseDomainUserPage = SyncComponent(() => import('./setting/base/user/domainUserPage'));

// 版本
const VersionPage = SyncComponent(() => import('./setting/version'));

const Home = SyncComponent(() => import('./home'))
const Login = SyncComponent(() => import('./login/login'))


// form
const FormListPage = SyncComponent(() =>import('./setting/base/form/FormLisPage'))
const PreliminaryListPage = SyncComponent(() =>import('./setting/base/form/PreliminaryListPage'))
const PreliminaryTypeListPage = SyncComponent(() =>import('./setting/base/form/PreliminaryTypeListPage'))
const LinkFormDesign = SyncComponent(() =>import('./setting/base/form/LinkFormDesign'))


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
            path: '/login'
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
                            path:"/setting/message",
                            exact:true,
                        },

                        {
                            component: PluginList,
                            path:"/setting/plugin",
                            exact:true,
                        },
                        {
                            component: LogListPage,
                            path:"/setting/log",
                            exact:true,
                        },
                        {
                            component: VersionPage,
                            path:"/setting/version",
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
                            path: "/setting",
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
            path: '/login'
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
                            path:"/setting/message",
                            exact:true,
                        },

                        {
                            component: PluginList,
                            path:"/setting/plugin",
                            exact:true,
                        },
                        {
                            component: LogListPage,
                            path:"/setting/log",
                            exact:true,
                        },
                        {
                            component: VersionPage,
                            path:"/setting/version",
                            exact:true,
                        },

                        {
                            path: "/setting",
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
