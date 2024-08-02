import React, {useEffect, useState} from "react";
import {
    BellOutlined,
    QuestionCircleOutlined,
    LeftCircleOutlined,
    RightCircleOutlined,
    HomeOutlined,
    CarryOutOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import PortalMessage from "../messages/Messages";
import {AvatarLink, AppLink, HelpLink} from "thoughtware-licence-ui";
import {inject, observer} from "mobx-react";
import {getUser,productTitle, productWhiteImg,productWhitePureImg} from "thoughtware-core-ui";
import {renderRoutes} from "react-router-config";
import SettingAside from "./SettingAside";
import './Portal.scss';
import Profile from "../profile/Profile";
import menuBlack from '../../assets/images/menu-black.png';
import menuWhite from '../../assets/images/menu-white.png';

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

const Portal = props =>{

    const {route,history,systemRoleStore} = props;

    const {getSystemPermissions} = systemRoleStore;
    const path = props.location.pathname;

    //消息抽屉状态
    const [notificationVisibility,setNotificationVisibility] = useState(false);
    //未读
    const [unread,setUnread] = useState(0);
    //是否折叠
    const [isExpand,setIsExpand] = useState(false);
    //主题色
    const [themeType,setThemeType] = useState('default');

    useEffect(()=>{
        getSystemPermissions(getUser().userId);
        const type = localStorage.getItem('themeType')
        if(type){
            setThemeType(type)
        }
    },[])

    /**
     * type主题类型:
     * default(默认 --> --thoughtware-gray-600)，
     * blue(蓝色 --> #2f5eb1)，
     * black(黑色 --> #131d30)
     */
    const changeTheme = type => {
        setThemeType(type)
        localStorage.setItem('themeType',type)
    }
    return (
        <main className="eas-layout">
            {
                path.startsWith('/setting') ?
                <SettingAside {...props}/>
                :
                <div className={`eas-aside ${isExpand ? 'eas-aside-expand': 'eas-aside-normal'} eas-aside-${themeType}`}>
                    <div className='aside-logo' onClick={()=>history.push('/work')}>
                        {
                            themeType === 'default' ?
                                <img src={productWhiteImg.eas} height={32} width={32} alt={''}/>
                                :
                                <img src={productWhitePureImg.eas} height={32} width={32} alt={''}/>
                        }
                        {isExpand&&<div className='aside-logo-text'>{productTitle.eas}</div>}
                    </div>
                    <div className="aside-up">
                        {
                            firstRouters.map(item=>(
                                <div key={item.key}
                                     className={`aside-item ${path.indexOf(item.key)===0 ? "aside-select":""}`}
                                     onClick={()=>history.push(item.to)}
                                >
                                    <div className="aside-item-icon">{item.icon}</div>
                                    <div className="aside-item-title">{item.title}</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="aside-bottom">
                        {
                            isExpand ?
                                <div
                                    className={'aside-item'}
                                    onClick={()=>setNotificationVisibility(!notificationVisibility)}
                                >
                                    <div className="aside-item-icon"><BellOutlined/></div>
                                    <div className="aside-item-title">消息</div>
                                </div>
                                :
                                <div className="aside-bottom-text text-icon" data-title-right={'消息'}
                                     onClick={()=>setNotificationVisibility(!notificationVisibility)}
                                >
                                    <BellOutlined/>
                                </div>

                        }
                        <PortalMessage
                            translateX={isExpand?200:75}
                            history={history}
                            unread={unread}
                            setUnread={setUnread}
                            visible={notificationVisibility}
                            setVisible={setNotificationVisibility}
                        />
                        <HelpLink
                            bgroup={'eas'}
                            iconComponent={
                                isExpand ?
                                    <div className='aside-item'>
                                        <div className="aside-item-icon"><QuestionCircleOutlined/></div>
                                        <div className="aside-item-title">帮助与支持</div>
                                    </div>
                                    :
                                    <div className="aside-bottom-text" data-title-right={'帮助与支持'}>
                                        <QuestionCircleOutlined/>
                                    </div>
                            }
                        />
                        <AppLink
                            {...props}
                            bgroup={'eas'}
                            translateX={isExpand?200:75}
                            iconComponent={
                                isExpand?
                                    <div className='aside-item'>
                                        <div className="aside-item-icon">
                                            <img src={themeType==='default'?menuBlack:menuWhite} alt="link" width="16" height="16">
                                            </img>
                                        </div>
                                        <div className="aside-item-title">应用</div>
                                    </div>
                                    :
                                    <div className="aside-bottom-text" data-title-right={'应用'}>
                                        <img src={themeType==='default'?menuBlack:menuWhite} alt="link" width="16" height="16">
                                        </img>
                                    </div>
                            }
                        />
                        <AvatarLink
                            {...props}
                            changeTheme={changeTheme}
                            iconComponent={
                                isExpand?
                                    <div className='aside-item'>
                                        <div className="aside-item-icon"><Profile /></div>
                                        <div className="aside-item-title">{getUser().nickname || getUser().name}</div>
                                    </div>
                                    :
                                    <div className="aside-bottom-text" data-title-right={'个人中心'}>
                                        <Profile />
                                    </div>
                            }
                        />
                    </div>
                    <div className="aside-hover-expand"/>
                    <div className="aside-expand" onClick={()=>setIsExpand(!isExpand)}>
                        {isExpand ? <LeftCircleOutlined />:<RightCircleOutlined />}
                    </div>
                </div>
            }
            <section className='eas-layout-content'>
                {renderRoutes(route.routes)}
            </section>
        </main>
    )
}

export default inject("systemRoleStore","homeStore")(observer(Portal))



