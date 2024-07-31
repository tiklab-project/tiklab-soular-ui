import React,{useState,useEffect} from "react";
import {Spin} from 'antd';
import {RightOutlined} from '@ant-design/icons';
import {findLogPageByTime} from '../store/HomeStore';
import DynamicList from "../../common/list/DynamicList";

/**
 * 日志，工作台
 * @returns {JSX.Element}
 * @constructor
 */
const WidgetWorkOplog = props => {

    const {setShowOplog} = props

    const [logData,setLogData] = useState([]);
    //加载状态
    const [spinning,setSpinning] = useState(false);

    useEffect(() => {
        findLoggingCount()
    }, []);

    const findLoggingCount = ()=>{
        setSpinning(true);
        findLogPageByTime({pageParam:{pageSize:10,current:1}}).then(res => {
            if(res.code===0){
                setLogData(res.data?.dataList || [])
            }
            setSpinning(false);
        })
    }

    return(
        <div className="oplogWidget">
            <div className="workLayout-guide">
                <div className="workLayout-title">动态信息</div>
                <div className="workLayout-guide-right" onClick={()=>setShowOplog(true)}>
                    <RightOutlined/>
                </div>
            </div>
            <div className="oplogWidget-content">
                <Spin spinning={spinning}>
                    <DynamicList
                        dynamicList={logData}
                    />
                </Spin>
            </div>
        </div>
    )
}
export default WidgetWorkOplog
