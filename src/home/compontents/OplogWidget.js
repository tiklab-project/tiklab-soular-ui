import React, {useState, useEffect} from "react";
import {Space, Empty} from 'antd';
import {getUser} from 'tiklab-core-ui';
import {RightOutlined} from '@ant-design/icons';

import {getOplogPageService} from '../store/store';
import messageEmpty from "../../assets/message.svg";
import Btn from '../../common/btn';
import {PROJECT_NAME} from "../../utils/constant";
import './OplogWidget.scss';

/**
 * 日志，工作台
 * @returns {JSX.Element}
 * @constructor
 */
const OpLogWidget = props => {

    const {setViewDetail,setMoreOplog} = props

    const [logData,setLogData] = useState([])

    const [total,setTotal] = useState(null)

    useEffect(() => {
        getOplogPage()
    }, []);

    const getOplogPage = () => {
        getOplogPageService({
            userId: getUser().userId,
            pageParam:{
                pageSize:10,
                currentPage:1
            },
            bgroup:'eas'
        }).then(res=>{
            if (res.code === 0 ) {
                const data = res.data.dataList;
                setLogData(data);
                setTotal(res.data.totalPage)
            }
        })
    };

    const renderLis = (item,index) =>{
        const {abstractContent, bgroup, createTime, actionType} = item;
        return (
            <div className='tiklab_fulloplog-item' key={index} onClick={()=>setViewDetail(item)}>
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
        <div className={'oplogWidget'}>
            <div className={'oplogWidget-card'}>
                <div className="oplogWidget-card-body">
                    <div className="oplogWidget-card-body-header">
                        <div className="oplogWidget-card-body-header-title">动态</div>
                        {
                            total > 1 &&
                            <Btn
                                type={'link'}
                                onClick={()=>setMoreOplog(true)}
                                icon={
                                    <RightOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}} />
                                }
                            />
                        }
                    </div>
                    <div className="oplogWidget-card-body-content">
                        <div className='log-content'>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OpLogWidget
