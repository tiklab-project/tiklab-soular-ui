import React, {useState, useEffect} from "react";
import { Drawer, Select, List, Button, Empty} from "antd";
import {BellOutlined} from "@ant-design/icons";
import {findMessagePageService, updateMessageService} from "./api";
import {WORK_IMAGE} from "../../utils/constant";
import './styles';
import {getUser} from "tiklab-core-ui";

const { Option } = Select;

/**
 * 消息通知
 * @type {React.NamedExoticComponent<{readonly history?: *}>}
 */
const Notification = props => {

    const {history,setUnread,notificationVisibility,setNotificationVisibility} = props

    // 消息列表
    const [messageList,setMessageList] = useState([]);

    // 当前页数
    const [page,setPage] = useState(1);

    // 加载
    const [loading, setLoading] = useState(false);

    // 总页数
    const [total,setTotal] = useState(0);

    // 消息状态
    const [readStatus,setReadStatus] = useState(0);

    useEffect(() => {
        if (notificationVisibility) {
            findMessage()
        }
    },[notificationVisibility,page,readStatus]);

    /**
     * 获取信息
     */
    const findMessage = () => {
        let param = {
            pageParam: {
                pageSize: 20,
                currentPage: page
            },
            bgroup:'eas',
            sendType:"site",
            receiver:getUser().userId
        }
        if(readStatus!==2){
            param.status = readStatus
        }
        findMessagePageService(param).then(res=>{
            setLoading(false)
            if(res.code===0){
                setTotal(res.data?.totalPage || 1)
                if(readStatus===0){
                    setUnread(res.data.totalRecord || 0)
                }
                if(res.data.currentPage===1){
                    setMessageList(res.data.dataList || [])
                }
                if (res.data.currentPage > 1){
                    setMessageList([...messageList,...res.data.dataList])
                }
            }
        })
    }

    const onClose = () => {
        setNotificationVisibility(false);
    };

    const onLoadMore = () => {
        setPage(page+1)
        setLoading(true)
    }

    const loadMore =
        total > 1 && !loading ? (
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
        const {message,status,link,...resItem } = item
        if (item.status === 0) {
            const updateParams = {
                ...resItem,
                message: {
                    id: message.id
                },
                status: 1
            }
            // 更新消息（已读）
            updateMessageService(updateParams).then(res=>{
                findMessage()
            })
        }

        if (link) {
           history.push(link.split("#")[1])
        }
    }

    const onSelect = (value) => {
        setReadStatus(value)
        setPage(1)
    }

    return(
        <Drawer
            placement="right"
            onClose={onClose}
            visible={notificationVisibility}
            bodyStyle={{padding:0}}
            maskStyle={{background:"transparent"}}
            contentWrapperStyle={{width:420,top:48,height:"calc(100% - 48px)"}}
            title={
                <Select defaultValue={0} bordered={false} onSelect={onSelect}>
                    <Option value={2}><BellOutlined style={{fontSize:"var(--tiklab-icon-size-16)"}}/>全部通知</Option>
                    <Option value={0}><BellOutlined style={{fontSize:"var(--tiklab-icon-size-16)"}}/>未读通知</Option>
                    <Option value={1}><BellOutlined style={{fontSize:"var(--tiklab-icon-size-16)"}}/>已读通知</Option>
                </Select>
            }
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
    )
}

export default Notification;
