import React, {useEffect, useState} from "react";
import {Badge} from "antd";
import {BellOutlined, HomeOutlined, CarryOutOutlined, SettingOutlined, TeamOutlined} from "@ant-design/icons";
import PortalMessage from "../messages/Messages";
import {AvatarLink, AppLink, HelpLink} from "thoughtware-licence-ui";
import {inject, observer} from "mobx-react";
import {getUser,productWhiteImg} from "thoughtware-core-ui";
import {renderRoutes} from "react-router-config";
import PortalFeature from "./PortalFeature";
import './Portal.scss';

const Portal = props =>{

    const {history,route,replacePath,systemRoleStore} = props;

    const {getSystemPermissions} = systemRoleStore;
    const path = props.location.pathname;

    //消息抽屉状态
    const [notificationVisibility,setNotificationVisibility] = useState(false);
    //未读
    const [unread,setUnread] = useState(0);

    useEffect(()=>{
        if (typeof replacePath === 'function') {
            replacePath();
        }
        getSystemPermissions(getUser().userId)
    },[])

    const firstRouters = [
        {
            key:'/work',
            to:"/work",
            title: "首页",
            icon:<HomeOutlined />
        },
        {
            key:'/todo',
            to:"/todo",
            title: "待办",
            icon:<CarryOutOutlined />
        },
        {
            key:'/user',
            to:"/user/user",
            title: "用户",
            icon:<TeamOutlined />
        },
    ]

    return (
        <main className="eas-layout">
            <header className="eas-layout-header">
                <div className="layout-header">
                    <AppLink
                        {...props}
                        bgroup={'eas'}
                    />
                    <div className='layout-header-logo' onClick={()=>props.history.push('/work')}>
                        <img alt={'EAS'} src={productWhiteImg.eas} height={24} width={24}/>
                        <div>EAS</div>
                    </div>
                </div>
                <div className="layout-header">
                    <div className="layout-header-text">
                        <div className={`layout-header-text-icon ${notificationVisibility? "layout-header-text-icon-linked": ''}`}
                             onClick={()=>setNotificationVisibility(true)}
                             data-title-bottom={'消息'}
                        >
                            {
                                unread>0?
                                    <Badge count={unread} size="small">
                                        <BellOutlined className="text-icon"/>
                                    </Badge>
                                    :
                                    <BellOutlined className="text-icon"/>
                            }
                        </div>
                        <PortalMessage
                            history={history}
                            unread={unread}
                            setUnread={setUnread}
                            visible={notificationVisibility}
                            setVisible={setNotificationVisibility}
                        />
                    </div>
                    <div className="layout-header-text">
                        <HelpLink />
                    </div>
                    <div className="layout-header-text">
                        <PortalFeature/>
                    </div>
                    <div className="layout-header-text">
                        <AvatarLink {...props}/>
                    </div>
                </div>
            </header>
            <section className='eas-layout-content'>
                <div className='eas-home'>
                    <aside className="normal-aside">
                        <div className="normal-aside-up">
                            {
                                firstRouters.map(item=>(
                                    <div key={item.key}
                                         className={`normal-aside-item ${path.indexOf(item.key)===0 ? "normal-aside-select":""}`}
                                         onClick={()=>props.history.push(item.to)}
                                    >
                                        <div className="normal-aside-item-icon">{item.icon}</div>
                                        <div className="normal-aside-item-title">{item.title}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="normal-aside-bottom"
                             onClick={()=>props.history.push(`/setting/home`)}
                        >
                            <div className="normal-aside-bottom-icon" data-title-right='设置'>
                                <SettingOutlined className='bottom-icon'/>
                            </div>
                        </div>
                    </aside>
                    <section className='eas-normal-content'>
                        {renderRoutes(route.routes)}
                    </section>
                </div>
            </section>
        </main>
    )
}

export default inject("systemRoleStore","homeStore")(observer(Portal))



