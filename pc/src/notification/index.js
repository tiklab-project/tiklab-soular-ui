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
    const [message,setMessage] = useState([]);
    const [notificationVisibility,setNotificationVisibility] = useState(false);
    const [pageSize,] = useState(30);
    const [page,setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total,setTotal] = useState(0);

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
                const messageList = [...message, ...res.data.dataList];
                setMessage(messageList);
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
        const res =  await Axios.post('/message/messageDispatchItem/findMessageDispatchItemPage', dataParams);
        if (res.code === 0 ) {
            const data = [...message,...res.data.dataList];
            setMessage(data)
            setPage(page +1);
            setLoading(false)
        }
    }
    const loadMore =
        total > message.length && !loading ? (
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
                    <List
                        loadMore={loadMore}
                        dataSource={message}
                        renderItem={(item => {
                            let jsonData = {
                                title:item.messageTemplate.title,
                                status:item.status,
                                receiveTime:item.receiveTime,
                                content: item.messageTemplate.content,
                            }

                            return <List.Item
                            >
                                <div className={'tiklab_notification_message'} key={item.id}>
                                    <div className={'tiklab_notification_message_title'}>
                                        <span>{jsonData.title}</span>
                                    </div>
                                    <div className={'tiklab_notification_message_body'}>
                                        <p className={'tiklab_notification_message_summary'}>{jsonData.content}</p>
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
