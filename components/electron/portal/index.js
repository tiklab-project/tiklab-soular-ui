/**
 * @name: index
 * @author: mahai
 * @date: 2021-10-11 09:43
 * @description：index
 * @update: 2021-10-11 09:43
 */
import React, {useEffect, useState}  from 'react'

import { renderRoutes } from 'react-router-config';
import {inject, observer} from "mobx-react";
import {LOGIN_STATUS} from "../../login";
import {Redirect} from "react-router";
import {getUser} from "../../utils";
import {Button, Dropdown, Menu, message} from "antd";
import {useTranslation} from "react-i18next";
import {Axios} from "doublekit-core-ui";

import styles from './layout.module.scss';



const PortalElectron = (props) => {
    const { i18n } = useTranslation();
    const {
        portalLoginStore,
        redirect = '/login',
        setLoginWindow,
        sliderMenu=[],
        logo,
        headerComponent,
        languageSelectData = []
    } = props;

    const {isLogin, logout} = portalLoginStore;

    useEffect(() => {
        if(!getUser().ticket) {
            logout()
            if(typeof setLoginWindow === 'function') {
                setLoginWindow()
            }
        }
    }, [getUser()]);
    const [lan, setLan] = useState(i18n.language);

    const setLanguage = ({ key }) => {
        i18n.changeLanguage(languageSelectData[key].value)
        setLan(languageSelectData[key].value)
    };

    const menuLanguage = (
        <Menu onClick={setLanguage}>
            {
                languageSelectData.map((item, index) => {
                    return <Menu.Item key={index} value={item.value}>{item.label}</Menu.Item>
                })
            }
        </Menu>
    );


    // 判断是不是登录
    const isRedirect = () => {
        return !isLogin;
    }
    // 处理侧边栏点击事件
    const handleRouter = (router) => {
        props.history.push(router)
    }

    const Logout = () => {
        const formData = new FormData();
        const user = getUser()
        if (user && user.ticket) {
            formData.append('ticket', user.ticket)
            Axios.post('passport/logout', formData).then(res => {
                if (res.code === 0) {
                    logout()
                } else {
                    return message.error(res.msg)
                }
            })
        } else {
            logout()
        }
    }
    return(
        isRedirect() ? <Redirect to={redirect}/> :
        <div className={styles.layout}>
            <div className={styles.search}>
                <img src={logo} alt={'logo'} className={styles.logo}/>
                {headerComponent}
                <div className={styles.right}>
                    <Dropdown overlay={menuLanguage} className={styles.languageDropdown}>
                        <Button>{lan}</Button>
                    </Dropdown>
                    <span onClick={Logout} className={styles.logout_btn}>退出</span>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.menu}>
                    {
                        sliderMenu
                    }

                    {/*{*/}
                    {/*    sliderMenu.map(menu => {*/}
                    {/*        return (*/}
                    {/*            <div className={styles.menu_icon} onClick={() =>handleRouter(menu.router)} key={menu.key}>*/}
                    {/*                {*/}
                    {/*                    menu.title*/}
                    {/*                }*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}
                </div>
                <div className={styles.content}>
                    {renderRoutes(props.route.routes)}
                </div>
            </div>
        </div>
    )
};
export default inject(LOGIN_STATUS)(observer(PortalElectron))
