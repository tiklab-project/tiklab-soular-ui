import React from 'react';
import SyncComponent from './lazy/SyncComponent';
const layout = SyncComponent(() => import('./layout/Layout'));

const LogOut = SyncComponent(() => import('../components/Logout/logout'));

const Work = SyncComponent(() => import('./view/work/work'))
const AddWork = SyncComponent(() => import('./view/addWork/addWork'))
const EditWork = SyncComponent(() => import('./view/editWork/editWork'))

const Login = SyncComponent(() => import('../components/Login/Login'))
// const Wechat = SyncComponent(() => import('../components/wechat/wechat'))
//
// const Project = SyncComponent(() => import('../components/wechat/project'))

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
    // {
    //     component: Wechat,
    //     exact:true,
    //     path: '/wechat'
    // },
    // {
    //     component: Project,
    //     exact:true,
    //     path: '/project'
    // },
    {
        component: layout,
        key:'layout',
        routes: [
            {
                component: Work,
                path:"/",
                exact:true,
            },
            {
                component: AddWork,
                path:"/work/add",
                exact:true,
            },
            {
                component: EditWork,
                path:"/work/:id/edit",
                exact:true,
            }
        ]
    },
];

export default routes
