import React, {useState, useEffect} from "react";
import {List, Tabs, Tag, Empty, Button} from 'antd';
import {getUser, parseUserSearchParams} from 'tiklab-core-ui';
import {RightOutlined} from '@ant-design/icons';
import {getTodoPageService} from './api';

import messageEmpty from "../../../assets/message.svg";
import './style/index.scss';

/**
 * 代办
 * @param bgroup
 * @param changeTodo
 * @param history
 * @param isCe
 * @returns {JSX.Element}
 * @constructor
 */
const TodoWidget = ({bgroup,changeTodo, history, isCe}) => {
    const tagsData = bgroup === 'eas' ? ['all','eas', 'teamwire', 'kanass', 'postin', 'teston','matflow']:[bgroup];
    const [activeKey, setActiveKey] = useState(bgroup === 'eas' ? 'all': bgroup);

    const [todoData,setTodoData] = useState([]);
    const [total,setTotal] = useState(0)
    let defaultParams = {
        userId: getUser().userId,
        pageParam:{
            pageSize:10,
            currentPage:1
        }
    }
    if (isCe) {
        defaultParams = {
            ...defaultParams,
            bgroup: bgroup
        }
    }
    const [params,setParams] = useState(defaultParams);

    useEffect(() => {
        getTodoList(params)
    }, [params]);

    const getTodoList = async (param) => {
        const res =  await getTodoPageService(param);
        if (res.code === 0 ) {
            const data = res.data.dataList;
            setTodoData(data);
            setTotal(res.data.totalRecord)
        }
    }

    const changRouter = (item) => {
        const {link} = item;
        if (link) {
            if(/^http|https/.test(link)){
                window.open(link+"?" + parseUserSearchParams(getUser()))

            }
            history.push(link)
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
    const changeTabActive = (tab) => {
        setActiveKey(tab)
        if (tab === 'all') {
            setParams({
                userId: getUser().userId,
                pageParam:{
                    pageSize:10,
                    currentPage:1
                }
            })
        } else {
            setParams({
                userId: getUser().userId,
                pageParam:{
                    pageSize:10,
                    currentPage:1
                },
                bgroup: tab
            })
        }
    }

    const moreAction = () => {
        changeTodo()
    }

    const renderDataHtml = () => {
        return(
            <div className={'tab-content'}>
                <List
                    dataSource={todoData}
                    locale={{
                        emptyText: <Empty
                            imageStyle={{
                                height: 120,
                            }}
                            description={<span>没有待办</span>}
                            image={messageEmpty}
                        />,
                    }}
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
        )
    };

    return(
        <div className={'todoWidget'}>
            <div className={'todoWidget-card'}>
                <div className="todoWidget-card-body">
                    <div className="todoWidget-card-body-header">
                        <div className="todoWidget-card-body-header-title">待办</div>
                        {
                            todoData.length < total  &&
                            <Button
                                type={'link'}
                                onClick={moreAction}
                                icon={
                                    <RightOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}} />
                                }
                            />
                        }
                    </div>
                    <div className="todoWidget-card-body-content">
                        {
                            isCe ? renderDataHtml()
                                :
                                <Tabs activeKey={activeKey} onChange={changeTabActive}>
                                    {
                                        tagsData.map(tag => {
                                            return <Tabs.TabPane tab={tagLabel(tag)} key={tag}>
                                                {renderDataHtml()}
                                            </Tabs.TabPane>
                                        })
                                    }
                                </Tabs>
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoWidget;
