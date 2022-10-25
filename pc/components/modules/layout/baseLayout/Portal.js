/**
 * @Author: mahai
 * @Description: Enter feature description here
 * create: $2022/1/25
 */
import React, {useState, useEffect} from 'react';
import {Space, Tooltip, Badge, Select, Drawer} from "antd";
import {GlobalOutlined, SettingOutlined, BellOutlined} from "@ant-design/icons";
import {useTranslation} from 'react-i18next';
import {getUser, Axios} from 'tiklab-core-ui';
import {verifyUserHoc, WorkAppConfig, Profile} from 'tiklab-eam-ui'
import vipImg from '../../assets/images/vip.jpg';
import easLogo from '../../assets/eas.png'
import {connect} from 'tiklab-plugin-ui/es/_utils'


import PortalMenu from '../../../../src/portal-menu'
import styles from './layout.module.scss'

const { Option } = Select;
const Portal = props => {

    const {history} = props;
    const [currentLink, setCurrentLink] = useState(props.location.pathname);
    const { i18n} = useTranslation();

    const [lng,setLng] = useState(i18n.language)
    const [lngData] = useState(i18n.languages)

    const [visibility,setVisibility] = useState(false);
    const [profileVisibility,setProfileVisibility] = useState(false);
    const [notificationVisibility,setNotificationVisibility] = useState(false);

    const [message,setMessage] = useState({
        list:[],
        total:0
    })

    useEffect(() => {
        if (getUser().userId) {
            getMySiteMessage()
        }
    },[]);

    /**
     * 获取我的站点类型的消息数据
     */
    const getMySiteMessage = () => {
        const params = {
            pageParam:{
                pageSize:10,
                currentPage:1
            },
            sendType: 'site',
            receiver: getUser().userId
        }
        Axios.post('/message/messageDispatchItem/findMessageDispatchItemPage', params).then(res => {
            if (res.code === 0) {
                const messageList = res.data.dataList;
                setMessage({
                    list:messageList,
                    total: res.data.totalRecord
                })
            }
        })

    };

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

    const showDrawer = () => {
        setNotificationVisibility(true);
    };

    const onClose = () => {
        setNotificationVisibility(false);
    };
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
                        <Tooltip title={"通知"} mouseEnterDelay={0.3}>
                            <Badge count={message.total}><BellOutlined style={{fontSize:24}} onClick={showDrawer}/></Badge>
                        </Tooltip>

                        <Drawer
                            placement="right"
                            onClose={onClose}
                            visible={notificationVisibility}
                            width={420}
                            title={
                                <Select defaultValue="all" bordered={false}>
                                    <Option value="all"><BellOutlined style={{fontSize:18}}/>全部通知</Option>
                                    <Option value="read"><BellOutlined style={{fontSize:18}}/>未读通知</Option>
                                </Select>
                            }
                            bodyStyle={{
                                padding:0
                            }}
                        >
                            <div className={styles.layout_header_right_main}>
                                {
                                    message.list.map(item => {
                                        let jsonData = {
                                            title:item.messageTemplate.title,
                                            status:item.status,
                                            receiveTime:item.receiveTime,
                                            content: item.messageTemplate.content,
                                        }
                                        return(
                                            <div className={styles.layout_header_right_message}>
                                                <div className={styles.layout_header_right_message_title}>
                                                    <span>{jsonData.title}</span>
                                                </div>
                                                <div className={styles.layout_header_right_message_body}>
                                                    <p className={styles.layout_header_right_message_summary}>{jsonData.content}</p>
                                                    <div className={styles.layout_header_right_message_time}>{jsonData.receiveTime}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </Drawer>


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
