/**
 * @Author: mahai
 * @Description: Enter feature description here
 * create: $2022/1/25
 */
import React, {useState} from 'react';
import {getVersionInfo} from 'doublekit-core-ui';
import {useTranslation} from 'react-i18next'
import {verifyUserHOC, useWorkAppConfig} from 'doublekit-eam-ui'
import {Button, Avatar, Menu, Dropdown, Space} from "antd";
import {DownOutlined, LogoutOutlined} from "@ant-design/icons";

import logo from '../../assets/images/logo.jpeg'
import styles from './layout.module.scss'

const Portal = props => {

    const {history} = props;
    const [currentLink, setCurrentLink] = useState(props.location.pathname);
    const [component, ModalComponent, editOrAddModal] = useWorkAppConfig(false);
    const { i18n} = useTranslation();
    const homeRouter = [
        {
            to:'/work',
            title:'工作台',
            key: '/work'
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



    const showVersion = () => {
        const info = getVersionInfo();
        switch (info.release) {
            case 1:
                return {
                    title:"社区版",
                    disable: false
                }
            case 2:
                return {
                    title:"企业版",
                    disable: !info.expired
                }

            case 3:
                return {
                    title:"SASS版",
                    disable: !info.expired
                }
            default:
                return {
                    title:"社区版",
                    disable: false
                }
        }
    }

    const onMenu = ({key}) => {

        if (key === '1') {
            history.push('/logout')
            return
        }
    }
    const AvatarMenu = (
        <Menu
            onClick={onMenu}
            style={{width:140}}
            items={[
                {
                    label: '退出',
                    key: '1',
                    icon: <LogoutOutlined />,
                }
            ]}
        />
    )

    const onLanguageChange = (key) => {
        i18n.changeLanguage(key)
    }

    const renderLanguageData = () => {

        return i18n.languages.map(item => {
           switch (item) {
               case 'zh':
                   return {
                       label: '中文',
                       key: item,
                   }
               case 'cn':
                   return {
                       label: 'English',
                       key: item,
                   }
               case 'jp':
                   return {
                       label: 'Japan',
                       key: item,
                   }
               default:
                   return {
                       label: '中文',
                       key: item,
                   }
           }
        })
    }
    const showCurrentLanguage = () => {
        switch (i18n.language) {
            case 'zh':
                return '中文'
            case 'cn':
                return 'English'
            case 'jp':
                return 'Japan'
            default:
                return '中文'
        }
    }
    const LanguageMenu = () => (
            <Menu
                onClick={onLanguageChange}
                style={{width:140}}
                items={renderLanguageData()}
            />
    );


    return(
        <main className={styles.layout}>
            <header className={styles.layout_header}>
                <div className={styles.layout_header_left}>
                    {component}
                    <div className={styles.layout_header_left_logo}>
                        <img alt={'...'} src={logo}/>
                    </div>
                    <div className={styles.layout_header_left_link}>
                        {
                            homeRouter.map(item => {
                                return <span key={item.key} onClick={ () => changeCurrentLink(item)} className={currentLink === item.to ? styles.layout_header_left_link_active : null} style={{padding:'0 8px'}}> {item.title}</span>
                            })
                        }
                    </div>
                </div>
                <div className={styles.layout_header_right}>
                    <Button type={'link'} disabled = {showVersion().disable}>{showVersion().title}</Button>
                    <Dropdown overlay={LanguageMenu} placement="bottom">
                        <Button>
                            <Space>
                                {showCurrentLanguage()}
                                <DownOutlined />
                            </Space>
                        </Button>

                    </Dropdown>
                    <Dropdown overlay={AvatarMenu} placement="bottom">
                        <Avatar size={64} src={<img src="https://joeschmoe.io/api/v1/random" />} />
                    </Dropdown>
                </div>
            </header>
            <section className={styles.layout_content}>
                <div style={{width:'100%'}}>
                    {props.children}
                </div>
            </section>
            <footer className={styles.layoutFooter}>
                <div>
                    DARTHCLOUD
                </div>
            </footer>
            {ModalComponent}
            {editOrAddModal}
        </main>
    )
};
const verifyPortal = verifyUserHOC(Portal)
export default verifyPortal
