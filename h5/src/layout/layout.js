/**
 * @name: layout
 * @author: mahai
 * @date: 2021-05-21 16:53
 * @description：layout
 * @update: 2021-05-21 16:53
 */
import React, {useEffect, useState} from 'react';
import { NavBar, Space, SafeArea, TabBar } from 'antd-mobile'
import { MoreOutline, AppOutline, UnorderedListOutline } from 'antd-mobile-icons'

import {Redirect} from "react-router";
import {renderRoutes} from 'react-router-config'
import {urlQuery, saveUser, LOCALSTORAGE_KEY, getUser} from "tiklab-core-ui"
import wechatService from "../service/wechatService";
import './layout.scss';
const Layout = (props) => {
    const {redirect = '/login', location, history} = props;
    const tabRouters = [
        '/work',
        '/project'
    ]
    const query = urlQuery(window.location.href);
    const tabs = [
        {
            key: '/work',
            title: '工作台',
            icon: <AppOutline />,
        },
        {
            key: '/project',
            title: '项目设置',
            icon: <UnorderedListOutline />,
        },
    ]
    const [activeKey, setActiveKey] = useState(location.pathname);

    useEffect(async () => {
        if (query.ticket && query.userId && query.name && query.phone && query.email) {
            saveUser(query)
            return window.location.href =  window.location.origin + '/' +  (window.location.hash === '#/' ? window.location.hash : '#'+window.location.pathname)
        } else {
            await getWechatAuthUrl()
        }
    }, []);

    const setRouteActive = (value) => {
        setActiveKey(value)
        history.push(value)
    }

    const getWechatAuthUrl = async () => {
        const response = await wechatService.getAuthWechat();
        if (response.data) {
            localStorage.setItem(LOCALSTORAGE_KEY.WECHAT_AUTH_URL, response.data)
        }
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
    const userCookie = getUser()
    if (!userCookie.ticket) return <Redirect to={redirect}/>
    return (
        <div className={'layout'}>
            <div style={{ background: '#ffcfac' }}>
                <SafeArea position='top' />
            </div>
            <NavBar
                // right={right}
                backArrow={!tabRouters.includes(location.pathname)}
                left={tabRouters.includes(location.pathname)?'portal' : null}
                onBack={onGoBack}
            />
            <div className={'layout_body'}>
                {renderRoutes(props.route.routes)}
            </div>

            <TabBar activeKey={activeKey} onChange={value => setRouteActive(value)}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
            <div style={{ background: '#ffcfac' }}>
                <SafeArea position='bottom' />
            </div>
        </div>
    )
};

export default Layout
