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
import {AvatarLink, AppLink, HelpLink} from "tiklab-licence-ui";
import {inject, observer} from "mobx-react";
import {getUser,productTitle, productImg,productWhiteImg} from "tiklab-core-ui";
import {renderRoutes} from "react-router-config";
import SettingAside from "./SettingAside";
import './Portal.scss';
import Profile from "../profile/Profile";
import menuBlack from '../../assets/images/menu-black.png';
import menuWhite from '../../assets/images/menu-white.png';

const firstRouters = [
    {
        key:'/index',
        to:"/index",
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
        to:"/setting/home",
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
        const type = localStorage.getItem('theme')
        if(type){
            setThemeType(type)
        }
    },[])

    /**
     * type主题类型:
     * default(默认 --> --tiklab-gray-600)，
     * blue(蓝色 --> #2f5eb1)，
     * black(黑色 --> #131d30)
     */
    const changeTheme = type => {
        setThemeType(type)
        localStorage.setItem('theme',type)
    }

    return (
        <main className="soular-layout">
            {
                path.startsWith('/setting') ?
                <SettingAside {...props}/>
                :
                <div className={`soular-aside ${isExpand ? 'soular-aside-expand': 'soular-aside-normal'} soular-aside-${themeType}`}>
                    <div className='aside-logo' onClick={()=>history.push('/index')}>
                        {
                            isExpand ?
                            <>
                                <img src={themeType === 'default' ? productImg.soular : productWhiteImg.soular} height={24} width={24} alt={''}/>
                                <div className='aside-logo-text'>{productTitle.soular}</div>
                            </>
                            :
                            <img src={themeType === 'default' ? productImg.soular : productWhiteImg.soular} height={32} width={32} alt={''}/>
                        }
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
                                    className='aside-item'
                                    onClick={()=>setNotificationVisibility(!notificationVisibility)}
                                >
                                    <div className="aside-item-icon"><BellOutlined/></div>
                                    <div className="aside-item-title">消息</div>
                                </div>
                                :
                                <div className="aside-bottom-text text-icon" data-title-right={'消息'}
                                     onClick={()=>setNotificationVisibility(!notificationVisibility)}
                                >
                                    <BellOutlined className='aside-bottom-text-icon'/>
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
                            bgroup={'soular'}
                            iconComponent={
                                isExpand ?
                                    <div className='aside-item'>
                                        <div className="aside-item-icon"><QuestionCircleOutlined/></div>
                                        <div className="aside-item-title">帮助与支持</div>
                                    </div>
                                    :
                                    <div className="aside-bottom-text" data-title-right={'帮助与支持'}>
                                        <QuestionCircleOutlined className='aside-bottom-text-icon'/>
                                    </div>
                            }
                        />
                        <AppLink
                            {...props}
                            bgroup={'soular'}
                            translateX={isExpand?200:75}
                            iconComponent={
                                isExpand?
                                    <div className='aside-item'>
                                        <div className="aside-item-icon">
                                            <img src={themeType==='default'?menuBlack:menuWhite} alt="link" width="18" height="18">
                                            </img>
                                        </div>
                                        <div className="aside-item-title">应用</div>
                                    </div>
                                    :
                                    <div className="aside-bottom-text" data-title-right={'应用'}>
                                        <img src={themeType==='default'?menuBlack:menuWhite} alt="link" width="18" height="18"
                                             className='aside-bottom-text-icon'
                                        >
                                        </img>
                                    </div>
                            }
                        />
                        <AvatarLink
                            {...props}
                            changeTheme={changeTheme}
                            iconComponent={
                                isExpand?
                                    <div className='aside-item aside-item-user'>
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
            <section className='soular-layout-content'>
                {renderRoutes(route.routes)}
            </section>
        </main>
    )
}

export default inject("systemRoleStore","homeStore")(observer(Portal))



