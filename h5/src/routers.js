import React from 'react';
import SyncComponent from './lazy/SyncComponent';
import {Redirect} from "react-router";
const layout = SyncComponent(() => import('./layout/Layout'));

const LogOut = SyncComponent(() => import('../components/Logout/logout'));

const Work = SyncComponent(() => import('./view/work/work'))
const AddWork = SyncComponent(() => import('./view/addWork/addWork'))
const EditWork = SyncComponent(() => import('./view/editWork/editWork'))

const Login = SyncComponent(() => import('../components/Login/Login'))
// const Wechat = SyncComponent(() => import('../components/wechat/wechat'))
//
// const Project = SyncComponent(() => import('../components/wechat/project'))
const Project = SyncComponent(() => import('./view/project/list'))

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
                path:"/work",
                exact:true,
            },
            {
                component: Project,
                path:"/project",
                exact:true,
            },
            {
                component: AddWork,
                path:"/project/add",
                exact:true,
            },
            {
                component: EditWork,
                path:"/project/:id/edit",
                exact:true,
            },
            {
                path: "/",
                exact: true,
                render: ()=><Redirect to="/work"/>
            },
        ]
    },
];

export default routes
