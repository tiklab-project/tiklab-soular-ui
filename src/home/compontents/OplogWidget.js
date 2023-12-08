import React, {useState, useEffect} from "react";
import {Space, Empty} from 'antd';
import {applyJump, getUser} from 'tiklab-core-ui';
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

    const {history} = props

    const [logData,setLogData] = useState([])

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
                setLogData(res.data.dataList);
            }
        })
    };

    const changRouter = item => {
        const {link} = item;
        if (link && /^http|https/.test(link)) {
            applyJump(link)
        }
    }

    const renderLis = (item,index) =>{
        return (
            <div key={index} className="tiklab_fulloplog-item" onClick={()=>changRouter(item)}>
                <div className="dynamic-item-data">
                    <div dangerouslySetInnerHTML={{__html: item.data}}/>
                </div>
                <div className="dynamic-item-time">{item.createTime}</div>
            </div>
        )
    }

    return(
        <div className={'oplogWidget'}>
            <div className={'oplogWidget-card'}>
                <div className="oplogWidget-card-body">
                    <div className="oplogWidget-card-body-header">
                        <div className="oplogWidget-card-body-header-title">动态</div>
                        <div onClick={()=>history.push('/oplog')} style={{color:"var(--tiklab-blue)"}}>
                            <RightOutlined/>
                        </div>
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
