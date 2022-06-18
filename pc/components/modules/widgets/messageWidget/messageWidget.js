/**
 * @name: messageWidget
 * @author mahai
 * @date 2022/6/16 10:40 AM
 * @description messageWidget
 */

import React, { useState, useEffect } from 'react';
import {List, Tag} from 'antd';
import {getUser, parseUserSearchParams} from 'doublekit-core-ui';
import {withRouter} from 'react-router-dom'
import messageServer from './api'
import './messageWidget.scss';

const { CheckableTag } = Tag;
const tagsData = ['portal', 'project', 'apibox'];
const MessageWidget = ({history}) => {

    const [selectedTags, setSelectedTags] = useState(['portal']);
    const [messageData,setMessageData] = useState([]);
    const [params,setParams] = useState({
        pageParam:{
            pageSize:10,
            currentPage:1
        },
        application: selectedTags[0]
    })
    useEffect(() => {
        messageServer.getMessageList(params).then(res => {
            if (res.code === 0 ) {
                const data = res.data.dataList;
                setMessageData(data)
            }
        })
    }, [params]);



    const handleChange = (tag, checked) => {
         checked ? setSelectedTags([tag]) : selectedTags.filter((t) => t !== tag);
         setParams({
             ...params,
             application: tag
         })
    };

    const changRouter = (item) => {
        const {messageTemplate} = item;
        const reg = /(http|https):\/\/([\w.]+\/?)\S*/ig
        if (reg.test(messageTemplate.link)) {
            window.open(messageTemplate.link+"?" + parseUserSearchParams(getUser()))
        } else {
            history.push(messageTemplate.link)
        }
    }

    return(
        <div className={'messageWidget'}>
            <div className={'messageWidget-card'}>
                <div className="messageWidget-card-body">
                    <div className="messageWidget-card-body-header">
                        <div className="messageWidget-card-body-header-title">最新消息</div>
                        <div className='message-tags'>
                            {tagsData.map((tag) => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTags.indexOf(tag) > -1}
                                    onChange={(checked) => handleChange(tag, checked)}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </div>
                    </div>


                    <div className="messageWidget-card-body-content">
                        <List
                            dataSource={messageData}
                            renderItem={(item) => {
                                const {data = ''} = item.message;
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
                </div>
            </div>
        </div>
    )
}

export default withRouter(MessageWidget)
