/**
 * @name: index
 * @author mahai
 * @date 2022/9/23 1:33 PM
 * @description index
 */
import React, {useState, useEffect} from "react";
import {List, Tag} from 'antd';
import {getUser, parseUserSearchParams} from 'tiklab-core-ui';
import {withRouter} from 'react-router-dom'
import todoServer from './api';
import './style/index.scss';

const { CheckableTag } = Tag;
const tagsData = ['all','eas', 'teamwire', 'kanass', 'postin', 'teston','matflow'];

const TodoWidget = () => {
    const [selectedTags, setSelectedTags] = useState(['all']);
    const [todoData,setTodoData] = useState([]);
    const [params,setParams] = useState({
        pageParam:{
            pageSize:10,
            currentPage:1
        }
    });

    useEffect(() => {
        getTodoList(params)
    }, [params]);

    const getTodoList = async (param) => {
        const res =  await todoServer.getTodoPage(param);
        if (res.code === 0 ) {
            const data = res.data.dataList;
            setTodoData(data)
        }
    }

    const changRouter = (item) => {

    }
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

    const showStatusLabel = (status) => {
        switch (status) {
            case 1:
                return <Tag color="#87d068">进行中</Tag>
            case 2:
                return <Tag color="#108ee9">完成</Tag>
            case 3:
                return <Tag color="#f50">逾期</Tag>
        }
    }
    return(
        <div className={'todoWidget'}>
            <div className={'todoWidget-card'}>
                <div className="todoWidget-card-body">
                    <div className="todoWidget-card-body-header">
                        <div className="todoWidget-card-body-header-title">待办任务</div>
                        <div className='todoWidget-tags'>
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


                    <div className="todoWidget-card-body-content">
                        <List
                            dataSource={todoData}
                            renderItem={(item) => {
                                return (
                                    <List.Item
                                        key={item.id}
                                        actions={[] }
                                    >
                                        <div className='item-todo' onClick={() => changRouter(item)}>
                                            <div className='item-todo-wrap'>
                                                <div className='item-todo-title'>
                                                    {item.title}

                                                </div>
                                                <div className='item-todo-content' >
                                                    {item.remark}
                                                </div>
                                            </div>
                                            <div className='time'>
                                                {showStatusLabel(item.status)}
                                                截止时间：{item.endTime}
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

export default TodoWidget;
