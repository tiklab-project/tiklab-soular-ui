/**
 * @Author: mahai
 * @Description: Enter feature description here
 * create: $2022/1/25
 */
import React, {useState} from 'react';
import {useBasePortal, LOGIN_STATUS, loginOutLocal} from '../../../index';
import {inject, observer} from "mobx-react";
import logo from '../../assets/images/logo.jpeg'

import './layout.scss'


const Portal = props => {

    const { portalLoginStore, history} = props;

    useBasePortal(portalLoginStore, history, '/login');



    const [currentLink, setCurrentLink] = useState(props.location.pathname);


    const homeRouter = [
        {
            to:'/work',
            title:'工作台',
            key: '/work'
        },{
            to:'/setting',
            title:'设置',
            key: '/setting'
        },
        {
            to:'/orga',
            title:'组织中心',
            key: 'org'
        },
        {
            to:'/system',
            title:'系统管理',
            key: 'system'
        },
    ]

    const changeCurrentLink = item => {
        setCurrentLink(item.to)
        props.history.push(item.to)
    }


    const Logout = () => {
        loginOutLocal(history, portalLoginStore, '/login')
    }

    return(
        <main className={'layout'}>
            <header className={'layout_header'}>
                <div className={'layout_header_left'}>
                    <div className={'layout_header_left_logo'}>
                        <img alt={'...'} src={logo}/>
                    </div>
                    <div className={'portal-header-link'}>
                        {
                            homeRouter.map(item => {
                                return <div key={item.key} onClick={ () => changeCurrentLink(item)} className={currentLink === item.to ? 'portal-header-link-active' : null}> {item.title}</div>
                            })
                        }
                    </div>
                </div>
                <div className={'layout_header_right'}>
                    <span onClick={Logout}>退出</span>
                </div>
            </header>
            <section className={'layout_content'}>
                <div style={{width:'100%'}}>
                    {props.children}
                </div>
            </section>
            <footer className='layout-footer'>
                <div>
                    DARTHCLOUD
                </div>
            </footer>
        </main>
    )
};

export default inject(LOGIN_STATUS)(observer(Portal))