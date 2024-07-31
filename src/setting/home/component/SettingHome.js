import React, {useState,useEffect} from "react";
import {Row, Col} from "antd";
import countStore from "../store/CountStore";
import "./SettingHome.scss";

const SettingHome = props => {

    const {findCount} = countStore;

    const [count,setCount] = useState({})

    useEffect(()=>{
        findCount().then(res=>{
            if(res.code===0){
                setCount(res.data)
            }
        })
    },[])

    /**
     * 路由跳转
     */
    const goPath = path => {
        props.history.push(`/setting/${path}`)
    }

    return (
        <Row className='setting-home'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "20", offset: "2"  }}
                lg={{ span: "16", offset: "4" }}
                xl={{ span: "14", offset: "5" }}
                xxl={{ span: "12", offset: "6" }}
            >
                <div className='eas-home-limited'>
                    <div className='home-message-box'>
                        <div className='home-title'>消息</div>
                        <div className='home-message'>
                            <div className='home-message-item' onClick={()=>goPath('notice')}>
                                <div className='home-label'>消息通知方案</div>
                                <div className='home-info'>
                                    {count?.noticeNumber || 0}
                                </div>
                            </div>
                            <div className='home-message-item' onClick={()=>goPath('send')}>
                                <div className='home-label'>消息发送方式</div>
                                <div className='home-info'>
                                    {count?.sendTypeNumber || 0}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='home-licence-box'>
                        <div className='home-title'>应用</div>
                        <div className='home-licence'>
                            <div className='home-licence-item' onClick={()=>goPath('version')}>
                                <div className='home-licence-item-label'>版本与许可证</div>
                                <div className='home-licence-item-level'>
                                    <div className='licence-level-label'>版本类型</div>
                                    <div className='licence-level-info'>{count?.version ? '社区版' : '企业版'}</div>
                                </div>
                            </div>
                            <div className='home-licence-item' onClick={()=>goPath('productAuth')}>
                                <div className='home-licence-item-label'>应用访问权限</div>
                                <div className='home-licence-item-level'>
                                    <div className='licence-level-label'>已授权</div>
                                    <div className='licence-level-info'>{count?.applyAuthNumber || 0}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
};

export default SettingHome;
