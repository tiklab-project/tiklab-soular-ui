/**
 * @name: layout
 * @author: mahai
 * @date: 2021-05-21 16:53
 * @description：layout
 * @update: 2021-05-21 16:53
 */
import React from 'react';
import {inject, observer} from 'mobx-react';
import { NavBar, Space, SafeArea } from 'antd-mobile'
import { MoreOutline } from 'antd-mobile-icons'

import {Redirect} from "react-router";
import {renderRoutes} from 'react-router-config'
import {urlQuery, saveUser} from "doublekit-core-ui"
import {LOGIN_STATUS} from '../../components'

const Layout = (props) => {
    const {TabBarComponent, redirect = '/login',  portalLoginStore, location, history} = props;
    const { isLogin } = portalLoginStore;
    const tabRouters = [
        '/',
    ]
    const query = urlQuery(window.location.href);
    if (query.ticket && query.userId && query.name && query.phone && query.email) {
        saveUser(query)
        window.location.href =  window.location.origin
    }

    const right = (
        <div style={{ fontSize: 24 }}>
            <Space style={{ '--gap': '16px' }}>
                <MoreOutline />
            </Space>
        </div>
    )

    const onGoBack = () => {
        history.push('/')
    }
    if (!isLogin) return <Redirect to={redirect}/>
    return (
        <>
            <div style={{ background: '#ffcfac' }}>
                <SafeArea position='top' />
            </div>
            <NavBar
                right={right}
                backArrow={!tabRouters.includes(location.pathname)}
                left={tabRouters.includes(location.pathname)?'portal' : null}
                onBack={onGoBack}
            />
            {renderRoutes(props.route.routes)}

            <div style={{ background: '#ffcfac' }}>
                <SafeArea position='bottom' />
            </div>
        </>
    )
};

export default inject(LOGIN_STATUS)(observer(Layout))
