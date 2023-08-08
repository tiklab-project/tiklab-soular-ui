import React, {useState,useEffect} from 'react';
import {Space, Tooltip, Menu, Badge} from "antd";
import {
    GlobalOutlined,
    SettingOutlined,
    QuestionCircleOutlined,
    SnippetsOutlined,
    CustomerServiceOutlined,
    CommentOutlined,
    UserOutlined,
    LogoutOutlined,
    BellOutlined
} from "@ant-design/icons";
import {useTranslation} from 'react-i18next';
import {getUser} from 'tiklab-core-ui';
import {renderRoutes} from 'react-router-config'
import {AppLink} from "tiklab-licence-ui";
import {findMessagePageService} from "../notification/api";
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

    // 消息抽屉状态
    const [notificationVisibility,setNotificationVisibility] = useState(false);

    // 未读
    const [unread,setUnread] = useState(0)

    useEffect(()=>{
        findMessagePageService({
            pageParam: {
                pageSize: 20,
                currentPage: 1
            },
            bgroup:'eas',
            sendType:"site",
            receiver:getUser().userId,
            status:0,
        }).then(res=>{
            if(res.code===0){
                setUnread(res.data.totalRecord || 0)
            }
        })
    },[])

    useEffect(()=>{
        setCurrentLink(path)
    },[path])

    const homeRouter = [
        {
            to:'/work',
            title:'首页',
            key: '/work'
        },
        // {
        //     to:'/dynamic',
        //     title:'动态',
        //     key: '/dynamic'
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
            // state:{
            //     preRoute: props.location.pathname
            // }
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
                    <AppLink isSSO={false}/>
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
                            <Notification
                                history={history}
                                setUnread={setUnread}
                                notificationVisibility={notificationVisibility}
                                setNotificationVisibility={setNotificationVisibility}
                            />
                            <Tooltip title={"通知"} mouseEnterDelay={0.3}>
                                <Badge count={unread}>
                                    <BellOutlined
                                        style={{fontSize:"var(--tiklab-icon-size-22)" ,color: "var(--tiklab-white)"}}
                                        onClick={()=>setNotificationVisibility(true)}
                                    />
                                </Badge>
                            </Tooltip>
                        </div>

                        <PortalMenu
                            tooltip={'帮助与支持'}
                            Icon={<QuestionCircleOutlined style={{fontSize:'var(--tiklab-icon-size-22)', color: "var(--tiklab-white)"}}/>}
                            width={240}
                        >
                            <>
                                <div className={'layout_header_right_portal_item'} onClick={()=>goHelp("document")}>
                                    <Space>
                                        <SnippetsOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>
                                        文档
                                    </Space>

                                </div>
                                <div className={'layout_header_right_portal_item'} onClick={()=>goHelp("question")}>
                                    <Space>
                                        <GlobalOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>
                                        社区支持
                                    </Space>
                                </div>
                                <div className={'layout_header_right_portal_item'} onClick={()=>goHelp("account/workOrder")}>
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