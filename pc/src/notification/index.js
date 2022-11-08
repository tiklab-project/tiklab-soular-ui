/**
 * @name: index
 * @author mahai
 * @date 2022/10/21 11:34 AM
 * @description index
 */
import React, {useState, memo, useEffect} from "react";
import {Badge, Drawer, Select, Tooltip, List, Button} from "antd";
import {Axios, getUser} from "tiklab-core-ui";

import {BellOutlined} from "@ant-design/icons";
import './styles/index';

const { Option } = Select;
const Notification = memo(({}) => {
    const [messageList,setMessageList] = useState([]);
    const [notificationVisibility,setNotificationVisibility] = useState(false);
    const [pageSize,] = useState(30);
    const [page,setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total,setTotal] = useState(0);

    const [readStatus,setReadStatus] = useState('all');

    useEffect(() => {
        if (getUser().userId) {
            getMySiteMessage(page, )
        }
    },[]);

    useEffect(() => {
        if (getUser().userId) {
            changeMessageList(page)
        }
    }, [readStatus]);

    /**
     * 切换数据状态
     */

    const changeMessageList = (current) => {
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
        switch (readStatus) {
            case "read":
                params['status'] = 1;
                break;
            case "unread":
                params['status'] = 0
                break;
        }
        setLoading(true);
        Axios.post('/message/messageDispatchItem/findMessageDispatchItemPage', params).then(res => {
            if (res.code === 0) {
                const messageList = res.data.dataList;
                setMessageList(messageList);
                setTotal(res.data.totalRecord)
                setLoading(false);
                setPage(current);
            } else {
                setLoading(false);
            }
        }).catch(() => {
            setLoading(false);
        })
    }

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
        switch (readStatus) {
            case "read":
                params['status'] = 1;
                break;
            case "unread":
                params['status'] = 0
                break;
        }
        setLoading(true);
        Axios.post('/message/messageDispatchItem/findMessageDispatchItemPage', params).then(res => {
            if (res.code === 0) {
                const messageList = [...message, ...res.data.dataList];
                setMessageList(messageList);
                setTotal(res.data.totalRecord)
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


    const onLoadMore = async () => {
        setLoading(true);
        const dataParams = {
            sendType: 'site',
            receiver: getUser().userId,
            pageParam:{
                pageSize:pageSize,
                currentPage:page +1
            }
        }
        switch (readStatus) {
            case "read":
                dataParams['status'] = 1;
                break;
            case "unread":
                dataParams['status'] = 0
                break;
        }
        const res =  await Axios.post('/message/messageDispatchItem/findMessageDispatchItemPage', dataParams);
        if (res.code === 0 ) {
            const data = [...message,...res.data.dataList];
            setMessageList(data)
            setPage(page +1);
            setLoading(false)
        }
    }
    const loadMore =
        total > messageList.length && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>加载更多</Button>
            </div>
        ) : null;

    const itemClick = async (item) => {
        const {message,messageTemplate,status, ...resItem } = item;
        if (item.status === 0) {
            const updateParams = {
                ...resItem,
                message:{
                    id: message.id
                },
                messageTemplate:{
                    id: messageTemplate.id
                },
                status:1
            }
            const res =  await Axios.post('/message/messageDispatchItem/updateMessageDispatchItem', updateParams);
            if (res.code === 0) {
                // 判断 选择的未读
                if (readStatus === 'unread') {
                   const list =  messageList.filter(f => f.id !== item.id);
                    setMessageList(list);
                   setTotal(list.length)
                }
                // 做跳转详情页

            }
        }
    }

    const onSelect = (value) => {
        setReadStatus(value)
    }
    return(
        <>
            <Tooltip title={"通知"} mouseEnterDelay={0.3}>
                <Badge count={total}><BellOutlined style={{fontSize:24}} onClick={showDrawer}/></Badge>
            </Tooltip>
            <Drawer
                placement="right"
                onClose={onClose}
                visible={notificationVisibility}
                width={420}
                title={
                    <Select defaultValue="all" bordered={false} onSelect={onSelect}>
                        <Option value="all"><BellOutlined style={{fontSize:18}}/>全部通知</Option>
                        <Option value="unread"><BellOutlined style={{fontSize:18}}/>未读通知</Option>
                        <Option value="read"><BellOutlined style={{fontSize:18}}/>已读通知</Option>
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
                    <List
                        loadMore={loadMore}
                        dataSource={messageList}
                        renderItem={(item => {
                            let jsonData = {
                                title:item.messageTemplate.title,
                                status:item.status,
                                receiveTime:item.receiveTime,
                                content: item.messageTemplate.content,
                            }

                            return <List.Item>
                                <div className={'tiklab_notification_message'} key={item.id} onClick={() => itemClick(item)}>
                                    <div className={'tiklab_notification_message_title'}>
                                        <span>{jsonData.title}</span>
                                    </div>
                                    <div className={'tiklab_notification_message_body'}>
                                        <p className={'tiklab_notification_message_summary'} dangerouslySetInnerHTML={{__html:jsonData.content}}/>
                                        <div className={'tiklab_notification_message_time'}>{jsonData.receiveTime}</div>
                                    </div>
                                </div>
                            </List.Item>
                        })}
                    />
                </div>
            </Drawer>
        </>

    )
});

export default Notification;
