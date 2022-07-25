import React from 'react';
import { Redirect } from 'react-router';
import {InternalWechatEntry, Logout, AuthResult} from 'doublekit-eam-ui'

import SyncComponent from '../lazy/SyncComponent';
import ElectronLoginPage from "./login/electornLogin";

const layout = SyncComponent(() => import('./layout/layout'));




// 设置模块
const LicensePage = SyncComponent(() => import('./system/license/licensePage'));
const PluginList = SyncComponent(() => import('./system/plugin'))

const Work = SyncComponent(() => import('./work/work'))
const Login = SyncComponent(() => import('./login/login'))



// 组织模块
const OrgaLayout = SyncComponent(() => import('./orga/contains'));
const OrgaManagement = SyncComponent(() => import('./orga/orgaManagement/orgaManagement'));
const UserManagement = SyncComponent(() => import('./orga/userManagement/userManagement'));

const PortalDirectory = SyncComponent(() => import('./orga/directory/portalDirectory'));

// 系统管理f
const System = SyncComponent(()=>import('./system/contains'))
// 权限模块
const ProjectFeature = SyncComponent(() => import('./system/projectFeature/projectFeature'));
const Feature = SyncComponent(() => import('./system/feature/feature'));
const DomainProjectRole = SyncComponent(() => import('./system/domainProjectRole/domainProjectRole'));
const ProjectSystemRole = SyncComponent(() => import('./system/projectSystemRole/projectSystemRole'));
const SystemRole = SyncComponent(() => import('./system/systemRole/systemRole'));

//消息模块
const MessageManagement = SyncComponent(() => import('./system/management/management'));
const MessageType = SyncComponent(() => import('./system/messageType/messageType'));
const UserMessage = SyncComponent(() => import('./system/userMessage/userMessage'));
const MessageSendType = SyncComponent(() => import('./system/sendType/sendType'));
const MessageTemplate = SyncComponent(() => import('./system/template/template'));


// widgiet的管理
const WidgetMangent = SyncComponent(() =>import('./widgets/widgetMangent'))

const routes = [
    // {
    //     path: '/',
    //     exact:true,
    //     component: Demo
    // },
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
                component: OrgaLayout,
                path: "/orga",
                routes:[
                    {
                        path: '/orga/dashbord',
                        component: OrgaManagement,
                    },{
                        path: '/orga/user',
                        component: UserManagement,
                    },

                    {
                        path: '/orga/directory',
                        component:PortalDirectory
                    },
                    {
                        path: "/orga",
                        exact: true,
                        render: ()=><Redirect to="/orga/dashbord"/>
                    },
                ]
            },
            {
                component: System,
                path: "/system",
                routes:[
                    {
                        path: '/system/feature',
                        component: Feature,
                    },{
                        path: '/system/role',
                        component: SystemRole,
                    },
                    {
                        path: '/system/projectfeature',
                        component: ProjectFeature,
                    },{
                        path: '/system/projectrole',
                        component: ProjectSystemRole,
                    },
                    {
                        path: '/system/DomainProjectRole',
                        component: DomainProjectRole,

                    },

                    {
                        path: '/system/message',
                        component: MessageManagement,
                    },{
                        path: '/system/messagetype',
                        component: MessageType,
                    },{
                        path: '/system/user',
                        component: UserMessage,
                    },{
                        path: '/system/messagesendtype',
                        component: MessageSendType,
                    },
                    {
                        path: '/system/messagetemplate',
                        component: MessageTemplate,
                    },
                    {
                        path: '/system/plugin',
                        component: PluginList,
                    },
                    {
                        path: '/system/license',
                        component: LicensePage,
                    },
                    {
                        path: '/system/widgetMangent',
                        component: WidgetMangent,
                    },
                    {
                        path: "/system",
                        exact: true,
                        render: ()=><Redirect to="/system/feature"/>
                    },
                ]
            },
        ],
    },
];

export default routes
