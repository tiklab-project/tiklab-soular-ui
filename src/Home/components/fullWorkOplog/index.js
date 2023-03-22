/**
 * @name: index
 * @author mahai
 * @date 2022/10/26 1:55 PM
 * @description index
 */
import React, {useState, useEffect} from "react";
import { Select, Row, Col, Space, Empty, List, DatePicker} from "antd";
import {LeftOutlined} from '@ant-design/icons';
import {getUser, parseUserSearchParams} from 'tiklab-core-ui';
import moment from 'moment';

import {getOplogPageService, getOpLogTypeListService} from "../oplogWidget/api";
import messageEmpty from "../../../assets/message.svg";
import './style/index.scss';
import LogDetail from "./components/LogDetail";

const { RangePicker } = DatePicker;
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

const FullWorkOplog = ({changeOplog, history}) => {

    const [pageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [logTypeList,setLogTypeList] = useState([]);

    const defaultParams = {
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage,
        },
        userId: getUser().userId
    }

    const [params,setParams] = useState(defaultParams)
    const [logData,setLogData] = useState([]);
    const [viewDetail,setViewDetail] = useState(null);

    useEffect(()=>{
        getOplogPage(params)
    },[params]);

    useEffect(() =>{
        getOplogTypeList()
    },[]);

    const getOplogTypeList = () => {
        getOpLogTypeListService({}).then(r =>{
            if (r.code === 0) {

                const oplogTypes = r.data.map(item => {
                    return {
                        value: item.id,
                        label: item.name,
                    }
                })
                setLogTypeList(oplogTypes);
            }
        })
    }


    const getOplogPage = async (param) => {
        const res =  await getOplogPageService(param);
        if (res.code === 0 ) {
            const data = res.data.dataList;
            setLogData(data);
            setCount(res.data.totalRecord)
        }
    }

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
    const OnSelectTime = (times) => {
        let newParams = {}
        if (times) {
            const start = moment(times[0]).format('YYYY-MM-DD') + ' 00:00:00';
            const end = moment(times[1]).format('YYYY-MM-DD') + ' 23:59:59';
            newParams = {
                ...params,
                pageParam: {
                    pageSize: pageSize,
                    currentPage: 1
                },
                timestamp:[start,end]
            }
        } else {
            const {timestamp, ...rest} = params
            newParams = {
                ...rest,
                pageParam: {
                    pageSize: pageSize,
                    currentPage: 1
                },
            }
        }
        setCurrentPage(1);
        setParams(newParams)
    };

    const onChangeOplogType = (item) => {
        setCurrentPage(1);
        const p = {
            ...params,
            actionType:item,
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            },
        }
        setParams(p)
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

    const onDetail = (item) => {
        setViewDetail(item)
    }

    const closeDetailPage = () => {
        setViewDetail(null);
    }
    if (!!viewDetail) {
        return (
            <div className={'tiklab_fulloplog'}>
                <LogDetail data={viewDetail} history={history} closeDetailPage={closeDetailPage}/>
            </div>
        )
    }
    return(

        <div className={'tiklab_fulloplog'}>
            <Row>
                <Col span={24}>
                    <Space>
                        <LeftOutlined onClick={()=> changeOplog()} style={{fontSize: 'var(--tiklab-icon-size-16)', padding: "16px 0", cursor: 'pointer'}}/>
                        <span className={'tiklab_fulloplog_nav'}>日志</span>
                    </Space>
                </Col>
            </Row>
            <Row justify={'space-between'} style={{paddingBottom:16 , width:'100%'}}>
                <Col span={24}>
                    <Space>
                        <Select
                            options={PRODUCTS}
                            placeholder={"产品"}
                            style={{width:240}}
                            onChange={onChangeProduct}
                            defaultValue={'all'}
                        />
                        <Select
                            options={logTypeList}
                            placeholder={"类型"}
                            style={{width:240}}
                            onChange={onChangeOplogType}
                        />
                        <RangePicker
                            onChange={OnSelectTime}
                            placeholder={["开始时间", "结束时间"]}
                        />
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className={'tab-content'}>
                        <List
                            dataSource={logData}
                            locale={{
                                emptyText: <Empty
                                    imageStyle={{
                                        height: 120,
                                    }}
                                    description={<span>没有日志</span>}
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
                                total:count,
                                current:currentPage,
                                pageSize: pageSize,
                                showSizeChanger:false,
                                size:"small"
                            }}
                            renderItem={(item) => {
                                const {abstractContent, bgroup, timestamp, actionType} = item;

                                return(
                                    <div
                                        className={'item-oplog'}
                                        onClick={() => onDetail(item)}
                                    >
                                        <List.Item
                                            key={item.id}
                                            extra={
                                                <Space>
                                                    {tagLabel(bgroup)}
                                                    <div className='time'>{actionType.name}</div>
                                                    <div className='time'>{timestamp}</div>
                                                </Space>
                                            }
                                        >
                                            <div className={'full_oplog_abstract'}>
                                                <div className={'full_oplog_abstract_text'}>
                                                    <a>{abstractContent}</a>
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
export default FullWorkOplog
