/**
 * @name: index
 * @author mahai
 * @date 2022/9/23 1:33 PM
 * @description index
 */

import React, {useState, useEffect} from "react";
import {List, Tag} from 'antd';

import oplogServer from './api';

import './style/index.scss';

const OpLogWidget = () => {
    const { CheckableTag } = Tag;
    const tagsData = ['all','eas', 'teamwire', 'kanass', 'postin', 'teston','matflow'];

    const [selectedTags, setSelectedTags] = useState(['all']);

    const [logData,setLogData] = useState([]);
    const [params,setParams] = useState({
        pageParam:{
            pageSize:10,
            currentPage:1
        }
    });

    useEffect(() => {
        getOplogPage(params)
    }, [params])
    const getOplogPage = async (param) => {
        const res =  await oplogServer.getOplogPage(param);
        if (res.code === 0 ) {
            const data = res.data.dataList;
            setLogData(data)
        }
    };

    const handleChange = (tag, checked) => {
        checked ? setSelectedTags([tag]) : selectedTags.filter((t) => t !== tag);
        if (tag === 'all') {
            setParams({
                pageParam:{
                    pageSize:10,
                    currentPage:1
                }
            })
        } else {
            setParams({
                pageParam:{
                    pageSize:10,
                    currentPage:1
                },
                bgroup: tag
            })
        }
    };

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


    return(
        <div className={'oplogWidget'}>
            <div className={'oplogWidget-card'}>
                <div className="oplogWidget-card-body">
                    <div className="oplogWidget-card-body-header">
                        <div className="oplogWidget-card-body-header-title">日志</div>
                        <div className='oplogWidget-tags'>
                            {tagsData.map((tag) => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTags.indexOf(tag) > -1}
                                    onChange={(checked) => handleChange(tag, checked)}
                                >
                                    {tagLabel(tag)}
                                </CheckableTag>
                            ))}
                        </div>
                    </div>


                    <div className="oplogWidget-card-body-content">
                        <List
                            dataSource={logData}
                            renderItem={(item) => {
                                return (
                                    <List.Item
                                        key={item.id}
                                        actions={[] }
                                    >
                                        <div className='item-oplog'>
                                            <div className='item-oplog-wrap'>
                                                <div className='item-oplog-title'>
                                                    {tagLabel(item.bgroup)}
                                                </div>
                                                <div className='item-oplog-content' >
                                                    {item.actionType}
                                                    <p>
                                                        {
                                                            item.content ? JSON.stringify(item.content) : null
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='time'>
                                                {item.timestamp}
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
export default OpLogWidget
