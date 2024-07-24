import React,{useState,useEffect} from "react";
import {Empty,Spin,Table} from 'antd';
import {RightOutlined} from '@ant-design/icons';
import {findLoggingCountList} from '../store/homeStore';
import messageEmpty from "../../assets/message.svg";
import Profile from "../../common/profile/Profile";

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
        findLoggingCountList().then(res => {
            if(res.code===0){
                setLogData(res.data)
            }
            setSpinning(false);
        })
    }

    const columns = [
        {
            title: '事件',
            dataIndex:['actionType','name'],
            key: 'actionType',
            width: '20%',
            ellipsis:true,
        },
        {
            title: '今日统计',
            dataIndex:'nowNumber',
            key: 'nowNumber',
            align:'center',
            width: '25%',
            ellipsis:true,
        },
        {
            title: '昨日统计',
            dataIndex:'yesterdayNumber',
            key: 'yesterdayNumber',
            align:'center',
            width: '35%',
        },
        {
            title: '人员',
            dataIndex:'nowUserList',
            key: 'nowUserList',
            width: '25%',
            ellipsis:true,
            render: (text,record) =>{
                const displayAvatars = text.slice(0, 5);
                const extraAvatarsCount = text.length - 5;
                return (
                    <div className="widget-log-avatar">
                        {
                            displayAvatars.length > 0 ?
                            displayAvatars.map((avatar, index) => (
                                <div className="avatar-wrapper" key={index}>
                                    <Profile
                                        userInfo={avatar}
                                        className={`avatar avatar-${Math.floor(Math.random() * 5)}`}
                                    />
                                </div>
                            ))
                            :
                            <div>--</div>
                        }
                        {extraAvatarsCount > 0 && (
                            <div className="more-avatars">+{extraAvatarsCount}</div>
                        )}
                    </div>
                )
            }
        },
    ]


    return(
        <Spin spinning={spinning}>
            <div className="oplogWidget">
                <div className="workLayout-guide">
                    <div className="workLayout-title">动态信息</div>
                    <div className="workLayout-guide-right" onClick={()=>setShowOplog(true)}>
                        <RightOutlined/>
                    </div>
                </div>
                <div className="oplogWidget-content">
                    <Table
                        columns={columns}
                        dataSource={logData}
                        rowKey = {record => record.actionType.id}
                        pagination={false}
                        locale={{
                            emptyText:
                                <Empty
                                    imageStyle={{
                                        height: 120,
                                    }}
                                    description={<span style={{color:"#999",fontSize:13}}>没有动态</span>}
                                    image={messageEmpty}
                                />
                        }}
                    />
                </div>
            </div>
        </Spin>
    )
}
export default WidgetWorkOplog
