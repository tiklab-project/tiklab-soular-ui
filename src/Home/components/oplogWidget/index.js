import React, {useState, useEffect} from "react";
import {List, Tabs, Space, Empty,Button} from 'antd';
import {getUser, parseUserSearchParams} from 'tiklab-core-ui';
import {RightOutlined} from '@ant-design/icons';

import {getOplogPageService} from './api';
import messageEmpty from "../../../assets/message.svg";
import './style/index.scss';

/**
 * 日志，工作台
 * @param bgroup
 * @param changeOplog
 * @param showOplogDetail
 * @param history
 * @param isCe
 * @param isDynamic
 * @returns {JSX.Element}
 * @constructor
 */
const OpLogWidget = ({bgroup, changeOplog, showOplogDetail, history, isCe, isDynamic=false}) => {
    const tagsData = bgroup === 'eas'?['all','eas', 'teamwire', 'kanass', 'postin', 'teston','matflow','xcode','xpack']:[bgroup];
    const [page,setPage] = useState(1);
    const [pageSize,] = useState(20);
    const [total,setTotal] = useState(0)
    const [activeKey, setActiveKey] = useState(bgroup === 'eas'?'all': bgroup);

    const [logData,setLogData] = useState([]);

    let defaultParams = {
        userId: getUser().userId,
        pageParam:{
            pageSize:pageSize,
            currentPage:page
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
        getOplogPage(params)
    }, [params]);

    const getOplogPage = async (param) => {
        const res =  await getOplogPageService(param);
        if (res.code === 0 ) {
            const data = res.data.dataList;
            setLogData(data);
            setTotal(res.data.totalRecord)
        }
    };

    const changeTabActive = (tab) => {
        setActiveKey(tab);
        setPage(1);
        if (tab === 'all') {
            setParams({
                userId: getUser().userId,
                pageParam:{
                    pageSize:pageSize,
                    currentPage:1
                }
            });
        } else {
            setParams({
                userId: getUser().userId,
                pageParam:{
                    pageSize:pageSize,
                    currentPage:1
                },
                bgroup: tab
            })
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
            case 'xcode':
                return "XCode";
            case 'xpack':
                return "XPack";
            default:
                return "全部";
        }
    }


    // const onLoadMore = async () => {
    //     setLoading(true);
    //     const dataParams = {
    //         ...params,
    //         pageParam:{
    //             pageSize:pageSize,
    //             currentPage:page +1
    //         }
    //     }
    //     const res =  await oplogServer.getOplogPage(dataParams);
    //     if (res.code === 0 ) {
    //         const data = [...logData,...res.data.dataList];
    //         setLogData(data)
    //         setPage(page +1);
    //         setLoading(false)
    //     }
    // }

    // const loadMore =
    //     total > logData.length && !loading ? (
    //         <div
    //             style={{
    //                 textAlign: 'center',
    //                 marginTop: 12,
    //                 height: 32,
    //                 lineHeight: '32px',
    //             }}
    //         >
    //             <Button onClick={onLoadMore}>加载更多</Button>
    //         </div>
    //     ) : null;

    const moreAction = () => {
        changeOplog()
    }

    const goOplogDetail = (item) => {
        showOplogDetail(item)
    }
    const renderDataHtml = () => {
        return(
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
                    // loadMore={loadMore}
                    renderItem={(item) => {
                        const {abstractContent, bgroup, timestamp, actionType} = item;
                        return(
                            <div className={'item-oplog'} onClick={() => goOplogDetail(item)}>
                                <List.Item
                                    key={item.id}
                                    extra={
                                        <Space>
                                            {tagLabel(bgroup)}
                                            <div className='time'>{actionType.name}</div>
                                            <div className='time'>
                                                {timestamp}
                                            </div>
                                        </Space>
                                    }
                                >
                                    <div className={'myoplog_abstract_widget'}>
                                        <div className={'myoplog_abstract_widget_text'}>
                                            <a>{abstractContent}</a>
                                        </div>
                                    </div>
                                </List.Item>
                            </div>
                        )
                    }}
                />
            </div>
        )
    }
    return(
        <div className={'oplogWidget'}>
            <div className={'oplogWidget-card'}>
                <div className="oplogWidget-card-body">
                    <div className="oplogWidget-card-body-header">
                        <div className="oplogWidget-card-body-header-title">日志</div>
                        {
                            !isDynamic && logData.length < total &&
                            <Button
                                type={'link'}
                                onClick={moreAction}
                                icon={
                                    <RightOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}} />
                                }
                            />
                        }
                    </div>
                    <div className="oplogWidget-card-body-content">
                        {
                            isCe ? renderDataHtml()
                                :
                                <Tabs activeKey={activeKey} onChange={changeTabActive}>
                                    {
                                        tagsData.map(tag => {
                                            return (
                                                <Tabs.TabPane tab={tagLabel(tag)} key={tag}>
                                                    {renderDataHtml()}
                                                </Tabs.TabPane>
                                            )
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
export default OpLogWidget
