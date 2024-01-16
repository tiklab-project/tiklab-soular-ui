import React, {useState, useEffect} from "react";
import {getUser} from 'thoughtware-core-ui';
import {RightOutlined} from '@ant-design/icons';
import {getOplogPageService} from '../store/store';
import DynamicList from "../../common/list/DynamicList";
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

    return(
        <div className={'oplogWidget'}>
            <div className={'oplogWidget-card'}>
                <div className="oplogWidget-card-body">
                    <div className="oplogWidget-card-body-header">
                        <div className="oplogWidget-card-body-header-title">动态</div>
                        <div onClick={()=>history.push('/oplog')} style={{color:"var(--thoughtware-blue)"}}>
                            <RightOutlined/>
                        </div>
                    </div>
                    <div className="oplogWidget-card-body-content">
                        <div className='log-content'>
                            <DynamicList dynamicList={logData}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OpLogWidget
