/**
 * @name: index
 * @author mahai
 * @date 2022/10/26 1:55 PM
 * @description index
 */
import React, {useState, useEffect} from "react";
import { Select, Row, Col, Space, Empty, List, Tag} from "antd";
import {LeftOutlined} from '@ant-design/icons';
import {getUser, parseUserSearchParams} from 'tiklab-core-ui';
import {getTodoPageService} from "../todo-widget/api";
import messageEmpty from "../assests/message.svg";
import './style/index.scss';


const PRODUCTS = [
    {
        value: 'all',
        label: "所有应用",
    },
    {
        value: 'eas',
        label: "Eas",
    },
    {
        value: 'postin',
        label: "PostIn",
    },
    {
        value: 'teamwire',
        label: "TeamWire",
    },
    {
        value: 'teston',
        label: "TestOn",
    },
    {
        value: 'kanass',
        label: "Kanass",
    },
    {
        value: 'matflow',
        label: "MatFlow",
    },
];
const statusList = [
    {
        value: 0,
        label: "所有状态",
    },
    {
        label: "进行中",
        value: 1
    },
    {
        label: "完成",
        value: 2
    },
    {
        label: "逾期",
        value: 3
    }
]
const FullWorkTodo = ({bgroup, changeTodo, history}) => {

    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [currentStatus, setCurrentStatus] = useState(0);

    const defaultParams = {
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage,
        },
        userId: getUser().userId,
        bgroup:bgroup
    }

    const [params,setParams] = useState(defaultParams)
    const [todoData,setTodoData] = useState([]);

    useEffect(()=>{
        getTodoList(params)
    },[params]);

    const getTodoList = async (param) => {
        const res =  await getTodoPageService(param);
        if (res.code === 0 ) {
            const data = res.data.dataList;
            setTodoData(data);
            setCount(res.data.totalRecord)
        }
    }

    const handleChange = (value) => {
        let changeParams = {};
        setCurrentStatus(value)
        setCurrentPage(1);
        if (value === 0) {
            changeParams = {
                pageParam: {
                    pageSize: pageSize,
                    currentPage: 1,
                },
                bgroup:bgroup
            }
        } else {
            changeParams = {
                pageParam: {
                    pageSize: pageSize,
                    currentPage: 1,
                },
                status:value,
                bgroup:bgroup
            }
        }
        setParams(changeParams)
    };

    const onChangeProduct = (value) => {
        let newParams = {}
        if (value === 'all') {
            newParams = {
                pageParam: {
                    pageSize: pageSize,
                    currentPage: 1
                }
            }
        } else {
            newParams = {
                ...params,
                pageParam: {
                    pageSize: pageSize,
                    currentPage: 1
                },
                bgroup: value
            }
        }
        setParams(newParams)
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

    const changRouter = (item) => {
        const {link} = item;
        if (link) {
            if(/^http|https/.test(link)){
                window.open(link+"?" + parseUserSearchParams(getUser()))

            }
            history.push(link)
        }
    }
    return(
        <div className={'tiklab_fulltodo'}>
            <Row>
                <Col span={24}>
                    <Space>
                        <LeftOutlined onClick={()=> changeTodo()} style={{fontSize: 'var(--tiklab-icon-size-16)', padding: "16px 0", cursor: 'pointer'}}/>
                        <span className={'tiklab_fulltodo_nav'}>任务待办</span>
                    </Space>
                </Col>
            </Row>
            <Row justify={'space-between'} style={{paddingBottom:16 , width:'100%'}}>
                <Col span={24}>
                    <Space>
                        <Select
                            options={statusList}
                            placeholder={'待办状态'}
                            onChange={handleChange}
                            defaultValue={currentStatus}
                            style={{width:240}}
                        />

                        {
                            bgroup === 'eas' &&
                            <Select
                                options={PRODUCTS}
                                placeholder={"产品"}
                                style={{width:240}}
                                onChange={onChangeProduct}
                                defaultValue={'all'}
                            />
                        }
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
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
                            pagination={{
                                onChange: page => {
                                    setCurrentPage(page)
                                    let changeParams = {
                                        ...params,
                                        pageParam: {
                                            pageSize: pageSize,
                                            currentPage: page,
                                        },
                                    };
                                    setParams(changeParams)
                                },
                                hideOnSinglePage:true,
                                current:currentPage,
                                pageSize: pageSize,
                                total: count,
                                showSizeChanger:false,
                                position:['bottomCenter']
                            }}
                            renderItem={(item) => {
                                return (
                                    <div className='item-todo' onClick={() => changRouter(item)}>
                                        <List.Item
                                            key={item.id}
                                            actions={[] }
                                        >
                                            <div >
                                                <div className='item-todo-wrap'>
                                                    <div className='item-todo-title'>
                                                        {item.title}
                                                    </div>
                                                    <div className='item-todo-content' >
                                                        {item.remark}
                                                    </div>
                                                </div>
                                                <div className='time'>
                                                    <Space>
                                                        <div>{item.bgroup}</div>
                                                        {showStatusLabel(item.status)}
                                                        截止时间：{item.endTime}
                                                    </Space>
                                                </div>
                                            </div>
                                        </List.Item>
                                    </div>

                                )
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </div>

    )
};
export default FullWorkTodo
