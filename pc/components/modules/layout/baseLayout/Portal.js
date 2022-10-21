/**
 * @Author: mahai
 * @Description: Enter feature description here
 * create: $2022/1/25
 */
import React, {useState} from 'react';
import {Avatar, Menu, Space} from "antd";
import {GlobalOutlined, LogoutOutlined, SettingOutlined} from "@ant-design/icons";
import {useTranslation} from 'react-i18next';
import {getUser} from 'tiklab-core-ui';
import {verifyUserHoc, useWorkAppConfig} from 'tiklab-eam-ui'
import apiboxImg from 'tiklab-eam-ui/es/assests/img/apibox.png';
import jenkinsImg from 'tiklab-eam-ui/es/assests/img/jenkins.png';
import knowledgeImg from 'tiklab-eam-ui/es/assests/img/apibox.png';
import projectImg from 'tiklab-eam-ui/es/assests/img/project.png';
import vipImg from '../../assets/images/vip.jpg';
import easLogo from '../../assets/eas.png'
import {connect} from 'tiklab-plugin-ui/es/_utils'
import styles from './layout.module.scss'

import PortalMenu from '../../../../src/portal-menu'

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

    const [visibility,setVisibility] = useState(false);
    const [settingVisibility,setSettingVisibility] = useState(false);
    const [profileVisibility,setProfileVisibility] = useState(false);

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

    const onLanguageChange = (key) => {
        setVisibility(!visibility);
        if (lng === key) return
        i18n.changeLanguage(key).then(res => {
            setLng(key)
        })

    }

    const goSetting = () => {
        setSettingVisibility(!settingVisibility);
        history.push({
            pathname:'/system',
        })
    }

    const goLogout = () => {
        setProfileVisibility(!profileVisibility)
        history.push({
            pathname:'/logout',
        })
    }
    return(
        <main className={styles.layout}>
            <header className={styles.layout_header}>
                <Space size={'large'}>
                    {component}
                    <img alt={'门户中心'} src={easLogo} height={'50%'}/>
                    {
                        homeRouter.map(item => {
                            return(
                                <div key={item.key} className={currentLink === item.to ? `${styles.layout_header_link} ${styles.layout_header_link_active}`  : styles.layout_header_link} onClick={ () => changeCurrentLink(item)}>
                                    <span>{item.title}</span>
                                </div>
                            )
                        })
                    }
                </Space>
                <div className={styles.layout_header_right}>
                    <Space size={'large'}>
                        <img src={vipImg} height={30} width={30} alt={'vip'}/>
                        <PortalMenu
                            tooltip={'国际化'}
                            visibility={visibility}
                            Icon={<GlobalOutlined/>}
                        >
                            <>
                                <div className={styles.layout_header_right_portal_tittle}>
                                    <span>语言</span>
                                </div>
                                {
                                    lngData.map(item => {
                                        return <div className={styles.layout_header_right_portal_item} key={item} onClick={() => onLanguageChange(item)}>{item}</div>
                                    })
                                }
                            </>
                        </PortalMenu>


                        <PortalMenu
                            tooltip={'设置'}
                            visibility={settingVisibility}
                            Icon={<SettingOutlined/>}
                        >
                            <>
                                <div className={styles.layout_header_right_portal_tittle}>
                                    <span>设置</span>
                                </div>
                                <div className={styles.layout_header_right_portal_item} onClick={goSetting}>系统设置</div>
                            </>
                        </PortalMenu>

                        <PortalMenu
                            tooltip={'profile'}
                            visibility={profileVisibility}
                            Icon={
                                <Avatar size={32} src={<img src="https://joeschmoe.io/api/v1/random"  alt={''}/>} />
                            }
                            width={300}
                        >
                            <>
                                <div className={styles.layout_header_right_portal_tittle}>
                                    <span>{getUser().nickname || getUser().name || "用户"}</span>
                                </div>
                                <div className={styles.layout_header_right_portal_item} >账户设置</div>

                                <div className={styles.layout_header_right_portal_item} onClick={goLogout}>退出</div>

                            </>
                        </PortalMenu>
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
