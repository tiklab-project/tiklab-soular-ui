/**
 * @Author: mahai
 * @Description: Enter feature description here
 * create: $2022/1/25
 */
import React, {useState} from 'react';
import {Button, Avatar, Menu, Dropdown, Space} from "antd";
import {getVersionInfo} from 'doublekit-core-ui';
import {useTranslation} from 'react-i18next'
import {verifyUserHoc, useWorkAppConfig} from 'doublekit-eam-ui'

import {connect} from 'doublekit-plugin-ui/es/_utils'


import {DownOutlined, LogoutOutlined, SettingOutlined} from "@ant-design/icons";

import logo from '../../assets/images/logo.jpeg'
import styles from './layout.module.scss'

const Portal = props => {

    const {history} = props;
    const [currentLink, setCurrentLink] = useState(props.location.pathname);
    const [component, ModalComponent, editOrAddModal] = useWorkAppConfig(false);
    const { i18n} = useTranslation();

    const [lng,setLng] = useState(i18n.language)
    const [lngData] = useState(i18n.languages)

    const homeRouter = [
        {
            to:'/work',
            title:'工作台',
            key: '/work'
        },
        {
            to:'/orga',
            title:'帐号与成员',
            key: 'org'
        }
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

    const onLanguageChange = (e) => {
        if (lng === e.key) return
        i18n.changeLanguage(e.key).then(res => {
            setLng(e.key)
        })

    }

    const renderLanguageData = () => {
        return lngData.map(item => {
           switch (item) {
               case 'zh':
                   return {
                       label: item,
                       key: item,
                   }
               case 'en':
                   return {
                       label: item,
                       key: item,
                   }
               case 'jp':
                   return {
                       label: item,
                       key: item,
                   }
               default:
                   return {
                       label: item,
                       key: item,
                   }
           }
        })
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
                                {lng}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    <SettingOutlined
                        onClick={
                            () => changeCurrentLink({to:'/system',})
                        }
                        style={{fontSize:24}}
                    />
                    <Dropdown overlay={AvatarMenu} placement="bottom">
                        <Avatar size={52} src={<img src="https://joeschmoe.io/api/v1/random"  alt={''}/>} />
                    </Dropdown>
                </div>
            </header>
            <section className={styles.layout_content}>
                <div style={{width:'100%'}}>
                    {props.children}
                </div>
            </section>
            {ModalComponent}
            {editOrAddModal}
        </main>
    )
};
const verifyPortal = verifyUserHoc(Portal)


function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}
export default connect(mapStateToProps)(verifyPortal);
