import React from 'react';
import { Redirect } from 'react-router';
import {InternalWechatEntry, Logout, AuthResult} from 'tiklab-eam-ui'

import SyncComponent from '../lazy/SyncComponent';
import ElectronLoginPage from "./login/electornLogin";
import {LogTemplateList} from "tiklab-oplog-ui";

const layout = SyncComponent(() => import('./layout/layout'));

// 设置layout
const SettingLayout = SyncComponent(()=> import('./setting/contains'));
//部门
const OrgaManagement = SyncComponent(() => import('./setting/orga/orgaManagement/orgaManagement'));
// 用户
const UserManagement = SyncComponent(() => import('./setting/orga/userManagement/userManagement'));
// 用户目录
const PortalDirectory = SyncComponent(() => import('./setting/orga/directory/portalDirectory'));
// 权限
const SystemRole = SyncComponent(() => import('./setting/systemRole/systemRole'));
// 消息发送方式
const MessageSendType = SyncComponent(() => import('./setting/message/messageSendType'));
// 消息通知
const MessageManagement = SyncComponent(() => import('./setting/message/management'));
// 待办任务
const TodoTaskPage = SyncComponent(() =>import('./setting/todotask/todoTask'))
// 插件
const PluginList = SyncComponent(() => import('./setting/plugin'))
// 操作日志
const LogListPage = SyncComponent(()=> import('./setting/oplog/logList'))
// 版本与许可证
// const Version = SyncComponent(()=> import('./setting/oplog/logList'))

// 基础数据
// 待办模板
const TodoTemplate = SyncComponent(()=> import('./setting/todotask/todoTemp'));

const BaseTodoTypePage =  SyncComponent(()=> import('./setting/base/todo/todoTypePage'));
//系统功能
const BaseSystemFeature = SyncComponent(() => import('./setting/base/privilege/baseSystemFeature'));
const BaseSystemRole = SyncComponent(() => import('./setting/base/privilege/baseSystemRole'));
//项目功能点
const BaseProjectFeature = SyncComponent(() => import('./setting/base/privilege/baseProjectFeature'));
const BaseProjectRole = SyncComponent(() => import('./setting/base/privilege/baseProjectRole'));

// 消息发送方式
const MessageSendTypeBase = SyncComponent(() => import('./setting/base/messageSendType'));
// 消息类型
const MessageType = SyncComponent(() => import('./setting/base/messageType'));
const BaseOplogTypePage = SyncComponent(() => import('./setting/base/oplog/oplogTypePage'));
//消息通知方案
const BaseMessageNoticePage = SyncComponent(() => import('./setting/base/messageNoticePage'));

// 版本
const VersionPage = SyncComponent(() => import('./setting/version/index'));

const Work = SyncComponent(() => import('./work/work'))
const Login = SyncComponent(() => import('./login/login'))

// widgiet的管理
const WidgetMangent = SyncComponent(() =>import('./widgets/widgetMangent'))


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
            component: ElectronLoginPage,
            exact:true,
            path: '/account'
        },
        {
            component: AuthResult,
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
                    component: Work,
                    path:"/work",
                    exact:true,
                },
                {
                    path:"/",
                    exact:true,
                    render:()=><Redirect to="/work"/>
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
                            component: TodoTaskPage,
                            path:"/setting/todotask",
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
                            component: LogTemplateList,
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
                            path: "/setting",
                            exact: true,
                            render: ()=><Redirect to="/setting/orga"/>
                        },
                    ]
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
            component: ElectronLoginPage,
            exact:true,
            path: '/account'
        },
        {
            component: AuthResult,
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
                    component: Work,
                    path:"/work",
                    exact:true,
                },
                {
                    path:"/",
                    exact:true,
                    render:()=><Redirect to="/work"/>
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
                            component: TodoTaskPage,
                            path:"/setting/todotask",
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
            ],
        },
    ];

    return dev_production ? devRouter : routes
}
export default selectionRouter()
