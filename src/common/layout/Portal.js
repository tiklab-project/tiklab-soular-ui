import React, {useState,useEffect} from 'react';
import {Space, Badge} from "antd";
import {
    SettingOutlined,
    BellOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import {getUser} from 'tiklab-core-ui';
import {renderRoutes} from 'react-router-config'
import {AppLink,HelpLink,AvatarLink} from "tiklab-licence-ui";
import {findMessagePageService} from "../notification/api";
import easLogo from '../../assets/eas.png'
import Notification from "../notification";
import PortalMenu from '../portalMenu'
import './Layout.scss'

const Portal = props => {

    const {history,route,systemRoleStore} = props;

    const {getSystemPermissions} = systemRoleStore

    let path = props.location.pathname
    const [currentLink, setCurrentLink] = useState(path);

    // 消息抽屉状态
    const [notificationVisibility,setNotificationVisibility] = useState(false);

    // 未读
    const [unread,setUnread] = useState(0)

    useEffect(()=>{
        getSystemPermissions(getUser().userId)
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
        if(path.indexOf("/user")===0) path="/user"
        setCurrentLink(path)
    },[path])

    const homeRouter = [
        {
            to:'/work',
            title:'首页',
            key: 'work'
        },
        {
            to:'/user',
            title:'用户管理',
            key: 'user'
        }
    ]

    const changeCurrentLink = item => {
        props.history.push(item.to)
    }


    return(
        <main className="layout">
            <header className="layout_header">
                <Space size="large">
                    <AppLink/>
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
                <div className='layout_header_right'>
                    <div className="layout_header_right-text">
                        <PortalMenu
                            tooltip={'设置'}
                            Icon={<SettingOutlined className="layout_header-icon"/>}
                            onClick={()=>props.history.push("/setting")}
                        />
                    </div>
                    <div className="layout_header_right-text">
                        <PortalMenu
                            tooltip={'消息'}
                            visibility={notificationVisibility}
                            Icon={<Badge count={unread} size="small">
                                    <BellOutlined className="layout_header-icon"/>
                                  </Badge>}
                            onClick={()=>setNotificationVisibility(true)}
                        />
                        <Notification
                            history={history}
                            setUnread={setUnread}
                            notificationVisibility={notificationVisibility}
                            setNotificationVisibility={setNotificationVisibility}
                        />
                    </div>
                    <div className="layout_header_right-text">
                        <HelpLink/>
                    </div>
                    <div className="layout_header_right-text">
                        <AvatarLink {...props}/>
                    </div>
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

export default inject("systemRoleStore")(observer(Portal))
