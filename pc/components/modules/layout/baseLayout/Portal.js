/**
 * @Author: mahai
 * @Description: Enter feature description here
 * create: $2022/1/25
 */
import React, {useState} from 'react';
import {Space, Tooltip} from "antd";
import {GlobalOutlined, SettingOutlined} from "@ant-design/icons";
import {useTranslation} from 'react-i18next';
import {getUser} from 'tiklab-core-ui';
import {verifyUserHoc, WorkAppConfig, Profile} from 'tiklab-eam-ui'
import vipImg from '../../assets/images/vip.jpg';
import easLogo from '../../assets/eas.png'
import {connect} from 'tiklab-plugin-ui/es/_utils'

import Notification from "../../../../src/notification";

import PortalMenu from '../../../../src/portal-menu'
import styles from './layout.module.scss'

const Portal = props => {

    const {history} = props;
    const [currentLink, setCurrentLink] = useState(props.location.pathname);
    const { i18n} = useTranslation();

    const [lng,setLng] = useState(i18n.language)
    const [lngData] = useState(i18n.languages)

    const [visibility,setVisibility] = useState(false);
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

    const onLanguageChange = (key) => {
        setVisibility(!visibility);
        if (lng === key) return
        i18n.changeLanguage(key).then(res => {
            setLng(key)
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
                    <WorkAppConfig isSSO={false}/>
                    <img alt={'门户中心'} src={easLogo} height={'50%'} />
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
                        <img src={vipImg} height={30} width={30} alt={'vip'} style={{borderRadius:"50%"}}/>
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

                        <Notification/>

                        <Tooltip title={"设置"} mouseEnterDelay={0.3}>
                            <span className={styles.layout_header_right_icon}>
                                <SettingOutlined
                                    onClick={
                                        () => changeCurrentLink({to:'/system',})
                                    }
                                />
                            </span>
                        </Tooltip>
                        <PortalMenu
                            tooltip={'profile'}
                            visibility={profileVisibility}
                            Icon={<Profile/>}
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
                <div style={{width:'100%', height:'calc(100% - 64px)'}}>
                    {props.children}
                </div>
            </section>
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
