/**
 * @name: index
 * @author mahai
 * @date 2022/10/21 11:34 AM
 * @description index
 */
import React, {useState, memo, useEffect} from "react";
import {Badge, Drawer, Select, Tooltip,Divider, Skeleton} from "antd";
import {Axios, getUser} from "tiklab-core-ui";

import InfiniteScroll from 'react-infinite-scroll-component';
import {BellOutlined} from "@ant-design/icons";
import './styles/index';

const { Option } = Select;
const Notification = memo(({}) => {
    const [message,setMessage] = useState({
        list:[],
        total:0
    })
    const [notificationVisibility,setNotificationVisibility] = useState(false);
    const [pageSize,] = useState(30);
    const [page,setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (getUser().userId) {
            getMySiteMessage(page)
        }
    },[]);

    /**
     * 获取我的站点类型的消息数据
     */
    const getMySiteMessage = (current) => {
        if (loading) {
            return;
        }
        const params = {
            pageParam:{
                pageSize:pageSize,
                currentPage:current
            },
            sendType: 'site',
            receiver: getUser().userId
        }
        setLoading(true);
        Axios.post('/message/messageDispatchItem/findMessageDispatchItemPage', params).then(res => {
            if (res.code === 0) {
                const messageList = [...message.list, ...res.data.dataList];
                setMessage({
                    list:messageList,
                    total: res.data.totalRecord
                });
                setLoading(false);
                setPage(current);
            } else {
                setLoading(false);
            }
        }).catch(() => {
            setLoading(false);
        })
    };
    const showDrawer = () => {
        setNotificationVisibility(true);
    };
    const onClose = () => {
        setNotificationVisibility(false);
    };
    return(
        <>
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
                mask={false}
                style={{
                    top: 64,
                    height: 'calc(100% - 64px)',
                }}
                className={'as'}
            >
                <div className={'tiklab_notification_main'} id="NotificationDiv">
                    <InfiniteScroll
                        dataLength={message.list.length}
                        next={()=>getMySiteMessage(page+1)}
                        hasMore={message.list.length < message.total}
                        loader={<Skeleton paragraph={{ rows: 2 }} active />}
                        endMessage={<Divider plain>没有数据 🤐</Divider>}
                        scrollableTarget="NotificationDiv"
                    >
                        {
                            message.list.map(item => {
                                let jsonData = {
                                    title:item.messageTemplate.title,
                                    status:item.status,
                                    receiveTime:item.receiveTime,
                                    content: item.messageTemplate.content,
                                }
                                return(
                                    <div className={'tiklab_notification_message'} key={item.id}>
                                        <div className={'tiklab_notification_message_title'}>
                                            <span>{jsonData.title}</span>
                                        </div>
                                        <div className={'tiklab_notification_message_body'}>
                                            <p className={'tiklab_notification_message_summary'}>{jsonData.content}</p>
                                            <div className={'tiklab_notification_message_time'}>{jsonData.receiveTime}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </InfiniteScroll>
                </div>
            </Drawer>
        </>

    )
});

export default Notification;
