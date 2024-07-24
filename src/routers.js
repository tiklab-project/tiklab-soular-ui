import React from 'react';
import { Redirect } from 'react-router';

import {
    Logout,
    Login,
    ExcludeProductUser,

    NotFound,
    NoAccess,

    Layout,
    WidgetWork,
    Oplog,
    Todo,

    UserNav,
    Setting,
    SettingHome,

    Orga,
    User,
    Directory,
    UserGroup,
    SystemRole,
    MessageSendType,
    MessageNotice,
    LogListPage,
    DataImport,
    BackupRestore,
    VersionPage,
    ProductAuth,

    SystemFeature,
    SystemRoleTrue,
    ProjectRole,
    ProjectFeature,
    ProjectVirtualRole,
    TodoTemp,
    TodoType,
    LogTemplate,
    LogType,
    MessageSendTypeTrue,
    MessageType,
    SystemMessageNotice,
    ProjectMessageNotice,
} from './export';

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
        component: Layout,
        path: '/',
        routes: [
            {
                component: WidgetWork,
                path:"/work",
                exact:true,
            },
            {
                component: Oplog,
                path:"/oplog",
                exact:true,
            },
            {
                component: Todo,
                path:"/todo",
                exact:true,
            },
            {
                path:"/404",
                component: NotFound,
            },
            {
                path:"/noaccess",
                component: NoAccess,
            },
            {
                component: UserNav,
                path:"/user",
                routes:[
                    {
                        component: Orga,
                        path:"/user/orga",
                        exact:true,
                    },
                    {
                        component: User,
                        path:"/user/user",
                        exact:true,
                    },
                    {
                        component: Directory,
                        path:"/user/dir",
                        exact:true,
                    },
                    {
                        component: UserGroup,
                        path: "/user/userGroup",
                        exact: true
                    },
                    {
                        component: SystemRole,
                        path:"/user/permission",
                        exact:true,
                    },
                ]
            },
            {
                component: Setting,
                path: "/setting",
                routes:[
                    {
                        component: SettingHome,
                        path:"/setting/home",
                        exact:true,
                    },
                    {
                        component: MessageSendType,
                        path:"/setting/messagesendtype",
                        exact:true,
                    },
                    {
                        component: MessageNotice,
                        path:"/setting/message",
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
                        component: BackupRestore,
                        path:"/setting/backups",
                        exact:true,
                    },
                    {
                        component: VersionPage,
                        path:"/setting/version",
                        exact:true,
                    },
                    {
                        component: ProductAuth,
                        path:"/setting/productAuth",
                        exact:true,
                    },
                    {
                        component: TodoTemp,
                        path:"/setting/base/todotemplate",
                        exact:true,
                    },
                    {
                        component: TodoType,
                        path:"/setting/base/todotype",
                        exact:true,
                    },
                    {
                        component: LogTemplate,
                        path:"/setting/base/oplogtemplate",
                        exact:true,
                    },
                    {
                        component: LogType,
                        path:"/setting/base/oplogtype",
                        exact:true,
                    },
                    {
                        component: SystemFeature,
                        path:"/setting/base/systemfeature",
                        exact:true,
                    },
                    {
                        component: SystemRoleTrue,
                        path:"/setting/base/systemrole",
                        exact:true,
                    },
                    {
                        component: ProjectFeature,
                        path:"/setting/base/projectfeature",
                        exact:true,
                    },
                    {
                        component: ProjectVirtualRole,
                        path:"/setting/base/vRole",
                        exact:true,
                    },
                    {
                        component: ProjectRole,
                        path:"/setting/base/projectrole",
                        exact:true,
                    },
                    {
                        component: MessageSendTypeTrue,
                        path:"/setting/base/messagesendtype",
                        exact:true,
                    },
                    {
                        component: MessageType,
                        path:"/setting/base/messagetype",
                        exact:true,
                    },
                    {
                        component:SystemMessageNotice,
                        path:"/setting/base/messageNotice",
                        exact:true,
                    },
                    {
                        component:ProjectMessageNotice,
                        path:"/setting/base/projectNotice",
                        exact:true,
                    },
                ]
            },
            {
                path:"/",
                exact:true,
                render:()=><Redirect to="/work"/>
            },
        ]
    }
]

export default routers;
