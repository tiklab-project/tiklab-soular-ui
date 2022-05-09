/**
 * @name: index
 * @author: mahai
 * @date: 2021-09-30 10:33
 * @description：index
 * @update: 2021-09-30 10:33
 */
import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom';

import LayoutPage from '../components/layout'
const HomePage = lazy(() => import('../pages/home'))
const OrgaPage = lazy(() => import('../pages/orga'))
const LoginPage = lazy(() => import('../pages/login'))
const UserPage = lazy(() => import('../pages/user'))
//项目成员管理
const DomainProjectUserPage = lazy(() => import('../pages/user/projectuser'));
const routes = [
    {
        path: '/login',
        exact: true,
        component: LoginPage
    },
    {
        routes:[
            {
                path: '/orga',
                exact: true,
                component: OrgaPage
            },
            {
                path: '/user',
                exact: true,
                component: UserPage
            },
            {
                path: '/projectuser',
                exact: true,
                component: DomainProjectUserPage
            },
            {
                path: '/',
                render: () => <Redirect to='/login' />
            }
        ]
    },
    {
        path: '*',
        render: () => <Redirect to='/' />
    }
]

export default routes
