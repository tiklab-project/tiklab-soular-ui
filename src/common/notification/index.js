import React, {useState, memo, useEffect} from "react";
import {Badge, Drawer, Select, Tooltip, List, Button, Space, Tag, Empty} from "antd";
import {getUser, parseUserSearchParams} from "tiklab-core-ui";
import {BellOutlined} from "@ant-design/icons";
import {findMessagePageService, updateMessageService} from "./api";
import {WORK_IMAGE} from "../../utils/constant";
import './styles';

const { Option } = Select;

/**
 * 消息通知
 * @type {React.NamedExoticComponent<{readonly history?: *}>}
 */
const Notification = memo(({history}) => {

    const [messageList,setMessageList] = useState([]);
    const [notificationVisibility,setNotificationVisibility] = useState(false);
    const [pageSize,] = useState(30);
    const [page,setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total,setTotal] = useState(0);

    const [readStatus,setReadStatus] = useState('all');

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
            receiver: getUser().userId,
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
        findMessagePageService(params).then(res => {
            if (res.code === 0) {
                const list = [...messageList, ...res.data.dataList];
                setMessageList(list);
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

    /**
     * 切换数据状态
     */
    const changeMessageList = (current,value) => {
        if (loading) {
            return;
        }
        const params = {
            pageParam:{
                pageSize:pageSize,
                currentPage:current
            },
            sendType: 'site',
            receiver: getUser().userId,
        }
        switch (value) {
            case "read":
                params['status'] = 1;
                break;
            case "unread":
                params['status'] = 0
                break;
        }
        setLoading(true);
        findMessagePageService(params).then(res => {
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
        const res =  await findMessagePageService(dataParams);
        if (res.code === 0 ) {
            const data = [...messageList,...res.data.dataList];
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
        const {message,status, link, ...resItem } = item;
        if (item.status === 0) {
            const updateParams = {
                ...resItem,
                message:{
                    id: message.id
                },
                status:1
            }
            const res =  await updateMessageService(updateParams);
            if (res.code === 0) {
                // 判断 选择的未读
                if (readStatus === 'unread') {
                   const list =  messageList.filter(f => f.id !== item.id);
                   setMessageList(list);
                   setTotal(list.length);
                }
                if (readStatus === 'all') {
                    const list =  messageList.map(f =>{
                        if ( f.id === item.id) {
                            return {
                                ...f,
                                status:1
                            }
                        }
                        return f
                    });
                    setMessageList(list);
                    setTotal(list.length);
                }

            }
        }
        // 做跳转详情页
        if (link) {
           if(/^http|https/.test(link)){
               window.open(link+"?" + parseUserSearchParams({
                   ticket:getUser().ticket
               }))
               return
           }
           history.push(link)
        }
    }

    const onSelect = (value) => {
        setReadStatus(value)
        changeMessageList(page,value)
    }

    return(
        <>
            <Tooltip title={"通知"} mouseEnterDelay={0.3}>
                <Badge count={total}><BellOutlined style={{fontSize:"var(--tiklab-icon-size-22)" ,color: "var(--tiklab-white)"}} onClick={showDrawer}/></Badge>
            </Tooltip>
            <Drawer
                placement="right"
                onClose={onClose}
                visible={notificationVisibility}
                bodyStyle={{padding:0}}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{width:420,top:48,height:"calc(100% - 48px)"}}
                title={
                    <Select defaultValue="all" bordered={false} onSelect={onSelect}>
                        <Option value="all"><BellOutlined style={{fontSize:"var(--tiklab-icon-size-16)"}}/>全部通知</Option>
                        <Option value="unread"><BellOutlined style={{fontSize:"var(--tiklab-icon-size-16)"}}/>未读通知</Option>
                        <Option value="read"><BellOutlined style={{fontSize:"var(--tiklab-icon-size-16)"}}/>已读通知</Option>
                    </Select>
                }
                className={'as'}
            >
                <div className={'tiklab_notification_main'} id="NotificationDiv">
                    <List
                        loadMore={loadMore}
                        dataSource={messageList}
                        locale={{
                            emptyText: <Empty description={<span>暂无消息</span>}/>
                        }}
                        renderItem={(item => {
                            const {title, sendTime, status} = item;
                            return <List.Item>
                                <div className={`tiklab_notification_message ${status===1?'message-read':'message-unread'}`}
                                     key={item.id}
                                     onClick={() =>itemClick(item)}
                                >
                                    <div className='message-bgroup'>
                                        <img src={WORK_IMAGE[item.bgroup]} alt={item.bgroup} width={22} height={22}/>
                                    </div>
                                    <div className='message-center'>
                                        <div className='message-center-title'>
                                            <span className='title'>{title}</span>
                                            <span className='time'>{sendTime}</span>
                                        </div>
                                        <div dangerouslySetInnerHTML={{__html: item.content}}/>
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
