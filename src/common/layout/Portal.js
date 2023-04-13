import React, {useState,useEffect} from 'react';
import {Space, Tooltip, Menu} from "antd";
import {GlobalOutlined, SettingOutlined, QuestionCircleOutlined,SnippetsOutlined, CustomerServiceOutlined, CommentOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import {useTranslation} from 'react-i18next';
import {getUser} from 'tiklab-core-ui';
import {renderRoutes} from 'react-router-config'
import {AppLink} from 'tiklab-integration-ui';
import Profile from "../profile";
import easLogo from '../../assets/eas.png'
import Notification from "../notification";
import PortalMenu from '../portalMenu'
import './Layout.scss'

const Portal = props => {

    const {history,route} = props;

    let path = props.location.pathname
    const [currentLink, setCurrentLink] = useState(path);
    const { i18n} = useTranslation();

    const [lng,setLng] = useState(i18n.language)
    const [lngData] = useState(i18n.languages)

    const [visibility,setVisibility] = useState(false);
    const [profileVisibility,setProfileVisibility] = useState(false);

    const [helpVisibility,setHelpVisibility] = useState(false)

    useEffect(()=>{
        setCurrentLink(path)
    },[path])

    const homeRouter = [
        {
            to:'/work',
            title:'工作台',
            key: '/work'
        },
        // {
        //     to:'/orga',
        //     title:'帐号与成员',
        //     key: 'org'
        // }
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

    /**
     * 帮助文档
     */
    const goHelp = path => {
        window.open(`http://tiklab.net/${path}`)
    }

    return(
        <main className={'layout'}>
            <header className={'layout_header'}>
                <Space size={'large'}>
                    {/*<AppLink isSSO={false}/>*/}
                    <img alt={'门户中心'} src={easLogo} height={'50%'} />
                    {
                        homeRouter.map(item => {
                            return(
                                <div key={item.key} className={currentLink === item.to ? `layout_header_link layout_header_link_active`  : 'layout_header_link'} onClick={ () => changeCurrentLink(item)}>
                                    <span>{item.title}</span>
                                </div>
                            )
                        })
                    }
                </Space>
                <div className={'layout_header_right'}>
                    <Space size={'large'}>
                        <Tooltip title={"设置"} mouseEnterDelay={0.3}>
                            <div className={'tiklab_portal_block_item'}>
                                <span className={'layout_header_right_icon'}>
                                    <SettingOutlined
                                        onClick={() => changeCurrentLink({to:'/Setting',})}
                                        style={{ color: "var(--tiklab-white)"}}
                                    />
                                </span>
                            </div>
                        </Tooltip>
                        <div className={'tiklab_portal_block_item'}>
                            <Notification history={history}/>
                        </div>

                        <PortalMenu
                            tooltip={'帮助与支持'}
                            visibility={helpVisibility}
                            Icon={<QuestionCircleOutlined style={{fontSize:'var(--tiklab-icon-size-22)', color: "var(--tiklab-white)"}}/>}
                            width={240}
                        >
                            <>
                                <div className={'layout_header_right_portal_item'} onClick={()=>goHelp("document/documentList")}>
                                    <Space>
                                        <SnippetsOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>
                                        文档
                                    </Space>

                                </div>
                                <div className={'layout_header_right_portal_item'} onClick={()=>goHelp("question/questionList")}>
                                    <Space>
                                        <GlobalOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>
                                        社区支持
                                    </Space>
                                </div>
                                <div className={'layout_header_right_portal_item'} onClick={()=>goHelp("account/workOrder/workOrderList")}>
                                    <Space>
                                        <CustomerServiceOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>
                                        在线工单
                                    </Space>
                                </div>
                                <div className={'layout_header_right_portal_item'} onClick={()=>goHelp("account/group/onlineservice")}>
                                    <Space>
                                        <CommentOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>
                                        在线客服
                                    </Space>
                                </div>
                            </>
                        </PortalMenu>

                        <PortalMenu
                            tooltip={'profile'}
                            visibility={profileVisibility}
                            Icon={<Profile/>}
                            width={300}
                        >
                            <>
                                <div className={'layout_header_right_portal_title'}>
                                    <Space>
                                        <Profile/>
                                        <div className={'layout_header_right_user'}>
                                            <span>{getUser().nickname || getUser().name || "用户"}</span>
                                            <span>{getUser().phone || getUser().eamil || "--"}</span>
                                        </div>
                                    </Space>
                                </div>

                                <Menu mode="vertical">
                                    <Menu.SubMenu
                                        key="sub4"
                                        title={<div><GlobalOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>切换语言</div>}
                                    >
                                        {
                                            lngData.map(lng => {
                                                return <Menu.Item key={lng}>{lng}</Menu.Item>
                                            })
                                        }

                                    </Menu.SubMenu>
                                </Menu>
                                <div className={'layout_header_right_portal_item'} >
                                    <Space>
                                        <UserOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>
                                        账户设置
                                    </Space>
                                </div>
                                <div className={'layout_header_right_portal_item'} onClick={goLogout}>
                                    <Space>
                                        <LogoutOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>
                                        退出
                                    </Space>
                                </div>
                            </>
                        </PortalMenu>
                    </Space>
                </div>
            </header>
            <section className={'layout_content'}>
                <div style={{width:'100%', height:'calc(100% - 48px)'}}>
                    {renderRoutes(route.routes)}
                </div>
            </section>
        </main>
    )
};

export default Portal
