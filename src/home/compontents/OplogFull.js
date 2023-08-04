import React, {useState, useEffect} from "react";
import {  Space, Empty, DatePicker} from "antd";
import {LeftOutlined} from '@ant-design/icons';
import {getUser,} from 'tiklab-core-ui';
import moment from 'moment';

import {getOplogPageService} from "../store/store";
import messageEmpty from "../../assets/message.svg";
import LogDetail from "./LogDetail";
import Page from '../../common/page/Page'
import {PROJECT_NAME} from "../../utils/constant";
import './OplogFull.scss';

const { RangePicker } = DatePicker;

/**
 * 日志
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const OplogFull = props => {

    const {setMoreOplog} = props

    const [pageParam] = useState({
        pageSize: 20,
        currentPage: 1,
    })

    const [params,setParams] = useState({pageParam})
    const [logData,setLogData] = useState([]);
    const [logPage,setLogPage] = useState({})
    const [viewDetail,setViewDetail] = useState(null);

    useEffect(()=>{
        // 获取日志
        getOplogPage()
    },[params]);

    /**
     * 获取日志
     * @returns {Promise<void>}
     */
    const getOplogPage = () => {
        getOplogPageService({
            ...params,
            userId: getUser().userId,
            bgroup:'eas'
        }).then(res=>{
            if (res.code === 0 ) {
                const data = res.data.dataList;
                setLogData(data);
                setLogPage({
                    total:res.data.totalPage
                })
            }
        })
    }

    /**
     * 模糊搜索日志
     * @param times：时间
     */
    const OnSelectTime = (times) => {
        let newParams = {}
        if (times) {
            const start = moment(times[0]).format('YYYY-MM-DD') + ' 00:00:00';
            const end = moment(times[1]).format('YYYY-MM-DD') + ' 23:59:59';
            newParams = {
                ...params,
                pageParam,
                createTime:[start,end]
            }
        } else {
            const {createTime, ...rest} = params
            newParams = {
                ...rest,
                pageParam
            }
        }
        setParams(newParams)
    };

    const changPage = page => {
        setParams({
            ...params,
            pageParam: {
                pageSize: 20,
                currentPage: page,
            }
        })
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
                <LogDetail data={viewDetail} history={props.history} closeDetailPage={closeDetailPage}/>
            </div>
        )
    }

    const renderLis = (item,index) =>{
        const {abstractContent, bgroup, createTime, actionType} = item;
        return (
            <div className='tiklab_fulloplog-item' key={index} onClick={()=>onDetail(item)}>
                <div className={'full_oplog_abstract'}>
                    <div className={'full_oplog_abstract_text'}>
                        <span>{abstractContent}</span>
                    </div>
                </div>
                <Space>
                    {PROJECT_NAME[bgroup]}
                    <div className='time'>{actionType && actionType.name}</div>
                    <div className='time'>{createTime}</div>
                </Space>
            </div>
        )
    }

    return(
        <div className='tiklab_fulloplog'>
            <div className='tiklab_fulloplog-content'>
                <Space className='tiklab_fulloplog-title'>
                    {
                        setMoreOplog &&
                        <LeftOutlined onClick={()=>setMoreOplog(false)} style={{fontSize: 'var(--tiklab-icon-size-16)',cursor: 'pointer'}}/>
                    }
                    <div className='tiklab_fulloplog_nav'>动态</div>
                </Space>
                <div className='tiklab_fulloplog_select'>
                    <RangePicker
                        onChange={OnSelectTime}
                        placeholder={["开始时间", "结束时间"]}
                    />
                </div>
                <div className={'tab-content'}>
                    {
                        logData && logData.length>0 ?
                            logData.map((item,index)=>renderLis(item,index))
                            :
                            <Empty
                                imageStyle={{
                                    height: 120,
                                }}
                                description={<span style={{color:"#999",fontSize:13}}>没有日志</span>}
                                image={messageEmpty}
                            />
                    }
                    <Page
                        pageCurrent={params.pageParam.currentPage}
                        changPage={changPage}
                        page={logPage}
                    />
                </div>
            </div>
        </div>

    )
};
export default OplogFull
