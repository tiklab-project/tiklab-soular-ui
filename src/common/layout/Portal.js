import React, {useEffect, useState} from "react";
import {Badge} from "antd";
import {
    BellOutlined,
    HomeOutlined,
    CarryOutOutlined,
    SettingOutlined,
    TeamOutlined,
    MenuFoldOutlined,
    SoundOutlined,
    MacCommandOutlined,
    LayoutOutlined,
    VerifiedOutlined,
    AppstoreOutlined
} from "@ant-design/icons";
import PortalMessage from "../messages/Messages";
import {AvatarLink, AppLink, HelpLink} from "thoughtware-licence-ui";
import {inject, observer} from "mobx-react";
import {getUser,productWhiteImg} from "thoughtware-core-ui";
import {renderRoutes} from "react-router-config";
import PortalFeature from "./PortalFeature";
import Aside from "../aside/Aside";
import './Portal.scss';

const applicationRouters =  [
    {
        id: "user",
        title: "用户与权限",
        icon: <TeamOutlined/>,
        children: [
            {
                id: "/setting/user",
                title: "用户",
                purviewCode: "user",
            },
            {
                id: "/setting/orga",
                title: "部门",
                purviewCode: "orga",
            },
            {
                id: "/setting/userGroup",
                title: "用户组",
                purviewCode: "user_group",
            },
            {
                id: "/setting/dir",
                title: "用户目录",
                purviewCode: "user_dir",
            },
            {
                id:"/setting/permission",
                title:"权限",
                purviewCode:"permission",
            },
        ]
    },
    {
        id:'message',
        title: '消息',
        icon :<SoundOutlined/>,
        children: [
            {
                id:'/setting/message',
                title: '消息通知方案',
            },
            {
                id:'/setting/messagesendtype',
                title: '消息发送方式',
            }
        ]
    },
    {
        id:'integration',
        title: '系统集成',
        icon :<MacCommandOutlined />,
        children:[
            {
                id:'/setting/data_import',
                title: '用户导入',
            }
        ]
    },
    {
        id:'security',
        title: '安全',
        icon :<LayoutOutlined/>,
        children:[
            {
                id:'/setting/backups',
                title: '备份与恢复',
                purviewCode:"restore",
            },
            {
                id:'/setting/log',
                title: '操作日志',
                purviewCode:'log',
            },
        ]
    },
    {
        id:'licence',
        title: '应用',
        icon :<VerifiedOutlined />,
        children:[
            {
                id:'/setting/version',
                title: '版本与许可证',
                purviewCode:'version',
            },
            {
                id:'/setting/productAuth',
                title: '应用访问权限',
            },
        ]
    },
]

const templateRouter = [
    {
        id:'base',
        title: '基础数据',
        icon :<AppstoreOutlined/>,
        children:[
            {
                id:'/setting/base/todotemplate',
                title: '待办模板',
            },
            {
                id:'/setting/base/todotype',
                title: '待办类型',
            },
            {
                id:'/setting/base/oplogtemplate',
                title: '日志模板',
            },
            {
                id:'/setting/base/systemfeature',
                title: '系统功能',
            },
            {
                id:'/setting/base/systemrole',
                title: '系统角色',
            },
            {
                id:'/setting/base/projectfeature',
                title: '项目功能',
            },
            {
                id:'/setting/base/projectrole',
                title: '项目角色',
            },
            {
                id:'/setting/base/vRole',
                title: '项目虚拟角色',
            },
            {
                id:'/setting/base/messageNotice',
                title: '消息通知方案',
            },
            {
                id:'/setting/base/messagesendtype',
                title: '消息通知类型',
            },
            {
                id:'/setting/base/messagetype',
                title: '消息类型',
            },
            {
                id:'/setting/base/oplogtype',
                title: '日志类型',
            },
        ]
    }
]

const menus = () =>{
    try{
        if(devProduction){
            return [...applicationRouters,...templateRouter]
        } else {
            return applicationRouters
        }
    }catch {
        return applicationRouters
    }
}

const Portal = props =>{

    const {history,route,systemRoleStore} = props;

    const {getSystemPermissions} = systemRoleStore;
    const path = props.location.pathname;

    //消息抽屉状态
    const [notificationVisibility,setNotificationVisibility] = useState(false);
    //未读
    const [unread,setUnread] = useState(0);

    useEffect(()=>{
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
            key:'/setting',
            to:"/setting",
            title: "设置",
            icon:<SettingOutlined />
        },
    ]

    return (
        <main className="eas-layout">
            {
                path.startsWith('/setting') ?
                <Aside
                    {...props}
                    outerPath={"/setting"}
                    applicationRouters={menus()}
                />
                :
                <div className="eas-normal-aside">
                    <div className='normal-aside-logo' onClick={()=>props.history.push('/work')}>
                        <img src={productWhiteImg.eas} height={28} width={28} alt={''}/>
                    </div>
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
                         onClick={()=>props.history.push(`/setting`)}
                    >
                        <div className="normal-aside-bottom-icon" data-title-right='设置'>
                            <SettingOutlined className='bottom-icon'/>
                        </div>
                    </div>
                </div>
            }
            <section className='eas-layout-content'>
                <header className="eas-layout-header">
                    <div className="layout-header">
                        <MenuFoldOutlined style={{fontSize:20}}/>
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
                            <AppLink
                                {...props}
                                bgroup={'eas'}
                            />
                        </div>
                        <div className="layout-header-text">
                            <AvatarLink {...props}/>
                        </div>
                    </div>
                </header>
                <div className='eas-layout-home'>
                    {renderRoutes(route.routes)}
                </div>
            </section>
        </main>
    )
}

export default inject("systemRoleStore","homeStore")(observer(Portal))



