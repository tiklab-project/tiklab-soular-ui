import React from 'react';
import { Redirect } from 'react-router';
import {Directory} from 'doublekit-user-ui'

import SyncComponent from '../lazy/SyncComponent';
const layout = SyncComponent(() => import('./layout/layout'));

const LogOut = SyncComponent(() => import('./logOut/logOut'));



// 设置模块
const Setting = SyncComponent(() => import('./setting/setting'));
const SettingAbout = SyncComponent(() => import('./setting/about/about'));
const PluginList = SyncComponent(() => import('./setting/plugin'))

const Work = SyncComponent(() => import('./work/work'))
const Login = SyncComponent(() => import('./login/login'))



// 组织模块
const OrgaLayout = SyncComponent(() => import('./orga/contains'));
const OrgaManagement = SyncComponent(() => import('./orga/orgaManagement/orgaManagement'));
const UserManagement = SyncComponent(() => import('./orga/userManagement/userManagement'));
const ProjectPeopleManagement = SyncComponent(() => import('./orga/projectPeopleManagement/projectPeopleManagement'));


// 系统管理
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


const DirectoryWrap = SyncComponent(() => import('./directory/directory'));


const routes = [

    {
        path: "/logout",
        exact: true,
        component: LogOut
    },
    {
        component: Login,
        exact:true,
        path: '/login'
    },
    {
        component: DirectoryWrap,
        exact:true,
        path: '/directory'
    },
    {
        component: layout,
        key:'layout',
        routes: [
            {
                component: Work,
                path:"/work",
                exact:true,
            },
            {
                component: Setting,
                path: "/setting",
                routes:[
                    {
                        path: '/setting/plugin',
                        component: PluginList,
                        exact: true
                    },
                    {
                        path: "/setting",
                        exact: true,
                        render: ()=><Redirect to="/setting/plugin"/>
                    },
                ]
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
                    },{
                        path: '/orga/peojectpeople',
                        component: ProjectPeopleManagement,
                    },
                    {
                        path: '/orga/directory',
                        component:Directory
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
                    },{
                        path: '/system/projectfeature',
                        component: ProjectFeature,
                    },{
                        path: '/system/projectrole',
                        component: ProjectSystemRole,
                    },{
                        path: '/system/projectrolecustom',
                        component: DomainProjectRole,
                    },
                    {
                        path: '/system/message',
                        // component: MessageManagement,
                        component:Directory
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
                        path: "/system",
                        exact: true,
                        render: ()=><Redirect to="/system/feature"/>
                    },
                ]
            },
        ],
    },
    {
        path:"/",
        exact:true,
        render:()=><Redirect to="/work"/>
    },
];

export default routes
