/**
 * @Author: mahai
 * @Description: Enter feature description here
 * create: $2022/1/25
 */
import React, {useState} from 'react';
import {Button, Avatar, Menu, Dropdown, Space} from "antd";
import {useTranslation} from 'react-i18next'
import {verifyUserHoc, useWorkAppConfig} from 'tiklab-eam-ui'
import apiboxImg from 'tiklab-eam-ui/es/assests/img/apibox.png';
import jenkinsImg from 'tiklab-eam-ui/es/assests/img/jenkins.png';
import knowledgeImg from 'tiklab-eam-ui/es/assests/img/apibox.png';
import projectImg from 'tiklab-eam-ui/es/assests/img/project.png';
import vipImg from '../../assets/images/vip.jpg';

import {connect} from 'tiklab-plugin-ui/es/_utils'


import {DownOutlined, LogoutOutlined, SettingOutlined} from "@ant-design/icons";

import logo from '../../assets/images/logo.jpeg'
import styles from './layout.module.scss'

const productIcons = {
    postin:apiboxImg,
    teamwire:projectImg,
    teston:jenkinsImg,
    kanass:knowledgeImg
}
const Portal = props => {

    const {history} = props;
    const [currentLink, setCurrentLink] = useState(props.location.pathname);
    const [component, ModalComponent, editOrAddModal] = useWorkAppConfig(false, productIcons);
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

    const onMenu = ({key}) => {
        if (key === '1') {
            // history.push('/logout')
            history.push({
                pathname:'/logout',
                state: {
                    preRoute: props.location.pathname
                }
            })

        }
    }
    const AvatarMenu = (
        <Menu
            onClick={onMenu}
            style={{width:140}}
        >
            <Menu.Item icon={<LogoutOutlined />} key={"1"}>
                退出
            </Menu.Item>
        </Menu>
    )

    const onLanguageChange = (e) => {
        if (lng === e.key) return
        i18n.changeLanguage(e.key).then(res => {
            setLng(e.key)
        })

    }




    const menu = (
        <Menu
            onClick={onLanguageChange}
            style={{width:140}}
        >
            {
                lngData.map(item => {
                    return <Menu.Item key={item}>{item}</Menu.Item>
                })
            }
        </Menu>

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
                    <Space>
                        <img src={vipImg} height={30} width={30} alt={'vip'}/>
                        <Dropdown overlay={menu}>
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
                        <Dropdown overlay={AvatarMenu}>
                            <Avatar size={52} src={<img src="https://joeschmoe.io/api/v1/random"  alt={''}/>} />
                        </Dropdown>
                    </Space>
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
