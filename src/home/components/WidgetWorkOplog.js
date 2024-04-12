import React, {useState, useEffect} from "react";
import {Select,Spin} from 'antd';
import {getUser,productSelect} from 'thoughtware-core-ui';
import {RightOutlined} from '@ant-design/icons';
import {getOplogPageService} from '../store/homeStore';
import DynamicList from "../../common/list/DynamicList";

/**
 * 日志，工作台
 * @returns {JSX.Element}
 * @constructor
 */
const WidgetWorkOplog = props => {

    const {setMoreOplog} = props

    const [activeKey,setActiveKey] = useState('all');
    const [logData,setLogData] = useState([]);
    const [spinning,setSpinning] = useState(false);

    useEffect(() => {
        getOplogPage()
    }, [activeKey]);

    const getOplogPage =  bgroup => {
        setSpinning(true)
        const param = {
            userId: getUser().userId,
            pageParam:{pageSize:10,currentPage:1},
        }
        if(activeKey!=='all'){
            param.bgroup = activeKey
        }
        getOplogPageService(param).then(res=>{
            if (res.code === 0 ) {
                setLogData(res.data.dataList);
            }
            setSpinning(false)
        })
    };

    return(
        <Spin spinning={spinning}>
            <div className="oplogWidget">
                <div className="oplogWidget-header">
                    <div className="oplogWidget-header-title">动态</div>
                    <div onClick={()=>setMoreOplog(true)} style={{color:"var(--thoughtware-blue)"}}>
                        <RightOutlined/>
                    </div>
                </div>
                <div className="oplogWidget-content">
                    <div className='log-select'>
                        <Select
                            options={[
                                {label: "全部应用", value: 'all'},
                                ...productSelect
                            ]}
                            value={activeKey}
                            onChange={value=>setActiveKey(value)}
                            style={{width: 120}}
                        />
                    </div>
                    <div className='log-content'>
                        <DynamicList dynamicList={logData}/>
                    </div>
                </div>
            </div>
        </Spin>
    )
}
export default WidgetWorkOplog
