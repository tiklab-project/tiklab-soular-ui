import React, {useState,useEffect} from 'react';
import {Space, Badge} from "antd";
import {
    SettingOutlined,
    BellOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import {getUser} from 'thoughtware-core-ui';
import {renderRoutes} from 'react-router-config'
import {AppLink,HelpLink,AvatarLink} from "thoughtware-licence-ui";
import logo from 'thoughtware-core-ui/es/assests/eas.png';
import PortalMessage from "../messages/Messages";
import './Portal.scss';

const Portal = props => {

    const {history,route,systemRoleStore} = props;

    const {getSystemPermissions} = systemRoleStore

    // 消息抽屉状态
    const [notificationVisibility,setNotificationVisibility] = useState(false);

    // 未读
    const [unread,setUnread] = useState(0)

    useEffect(()=>{
        getSystemPermissions(getUser().userId)
    },[])

    const homeRouter = [
        {
            to:'/work',
            title:'首页',
            key: 'work'
        },
        {
            to:'/oplog',
            title:'动态',
            key: 'oplog'
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
                    <div className='layout_header_logo'>
                        <img alt={'门户中心'} src={logo} height={24} width={24}/>
                        <div>EAS</div>
                    </div>
                    {
                        homeRouter.map(item => {
                            return(
                                <div key={item.key} className={props.location.pathname === item.to ? `layout_header_link layout_header_link_active`  : 'layout_header_link'} onClick={ () => changeCurrentLink(item)}>
                                    <span>{item.title}</span>
                                </div>
                            )
                        })
                    }
                </Space>
                <div className='layout_header_right'>
                    <div className="layout_header_right-text">
                        <div className="text_icon_block_item"
                             onClick={()=>props.history.push("/setting")}
                             data-title-bottom={'设置'}
                        >
                            <SettingOutlined className="layout_header-icon"/>
                        </div>
                    </div>
                    <div className="layout_header_right-text">
                        <div className={`text_icon_block_item ${notificationVisibility? "text_icon_block_linked": ''}`}
                             onClick={()=>setNotificationVisibility(true)}
                             data-title-bottom={'消息'}
                        >
                            <Badge count={unread} size="small">
                                <BellOutlined className="layout_header-icon"/>
                            </Badge>
                        </div>
                        <PortalMessage
                            history={history}
                            unread={unread}
                            setUnread={setUnread}
                            visible={notificationVisibility}
                            setVisible={setNotificationVisibility}
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
                {renderRoutes(route.routes)}
            </section>
        </main>
    )
};

export default inject("systemRoleStore")(observer(Portal))
