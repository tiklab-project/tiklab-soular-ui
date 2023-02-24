/**
 * @name: messageWidget
 * @author mahai
 * @date 2022/6/16 10:40 AM
 * @description messageWidget
 */

import React, { useState, useEffect } from 'react';
import {List, Tabs, Empty} from 'antd';
import {getUser, parseUserSearchParams} from 'tiklab-core-ui';
import {withRouter, Link} from 'react-router-dom'
import {getMessageListService} from './api';
import messageEmpty from '../assests/message.svg';
import './style/index.scss';

// '全部','账号中心', '项目管理', '接口管理'
const MessageWidget = ({history,bgroup}) => {
    const tagsData = bgroup === 'eas'?['all','eas', 'teamwire', 'kanass', 'postin', 'teston','matflow']:[bgroup];

    const [activeKey, setActiveKey] = useState(bgroup === 'eas'?'all': bgroup);
    const [messageData,setMessageData] = useState([]);
    const [params,setParams] = useState({
        pageParam:{
            pageSize:10,
            currentPage:1
        },
        application: activeKey
    })
    useEffect(() => {
        getMessageListService(params).then(res => {
            if (res.code === 0 ) {
                const data = res.data.dataList;
                setMessageData(data)
            }
        })
    }, [params]);

    const changRouter = (item) => {
        const {messageTemplate} = item;
        const reg = /(http|https):\/\/([\w.]+\/?)\S*/ig
        if (reg.test(messageTemplate.link)) {
            window.open(messageTemplate.link+"?" + parseUserSearchParams(getUser()))
        } else {
            history.push(messageTemplate.link)
        }
    }

    const tagLabel = (value) => {
        switch (value) {
            case "all":
                return "全部";
            case 'eas':
                return "EAS";
            case 'teamwire':
                return "TeamWire";
            case 'kanass':
                return "Kanass";
            case 'postin':
                return "PostIn";
            case 'teston':
                return "TestOn";
            case 'matflow':
                return "matflow";
            default:
                return "全部";
        }
    }

    const changeTabActive = (tab) => {
        setActiveKey(tab)
        setParams({
            ...params,
            application: tab
        })
    }

    return(
        <div className={'messageWidget'}>
            <div className={'messageWidget-card'}>
                <div className="messageWidget-card-body">
                    <div className="messageWidget-card-body-header">
                        <div className="messageWidget-card-body-header-title">最新消息</div>
                        <Link to={'/'}>更多</Link>
                    </div>
                    <div className="messageWidget-card-body-content">
                        <Tabs activeKey={activeKey} onChange={changeTabActive}>
                            {
                                tagsData.map(tag => {
                                    return <Tabs.TabPane tab={tagLabel(tag)} key={tag}>
                                        <div className={'tab-content'}>
                                            <List
                                                dataSource={messageData}
                                                locale={{
                                                    emptyText: <Empty
                                                        imageStyle={{
                                                            height: 120,
                                                        }}
                                                        description={<span>没有消息</span>}
                                                        image={messageEmpty}
                                                    />,
                                                }}
                                                renderItem={(item) => {
                                                    let jsonData = {
                                                        title:item.messageTemplate.title,
                                                        status:item.status,
                                                        receiveTime:item.receiveTime
                                                    }
                                                    return (
                                                        <List.Item
                                                            key={item.id}
                                                            actions={[] }
                                                        >
                                                            <div className='item-message' onClick={() => changRouter(item)}>
                                                                <div className='item-message-wrap'>
                                                                    <div className='item-message-title'>{jsonData.title}</div>
                                                                    <div className='item-message-content' dangerouslySetInnerHTML={{__html: item.messageTemplate.content}}/>
                                                                </div>
                                                                <div className='time'>
                                                                    {
                                                                        jsonData.receiveTime
                                                                    }
                                                                </div>
                                                            </div>
                                                        </List.Item>
                                                    )
                                                }}
                                            />
                                        </div>
                                    </Tabs.TabPane>
                                })
                            }

                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(MessageWidget)
