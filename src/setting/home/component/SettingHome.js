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
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "21", offset: "1" }}
                xxl={{ span: "20", offset: "2" }}
            >
                <div className='eas-home-limited'>
                    <div className='setting-home-chunk'>
                        <div className='home-title'>用户与权限</div>
                        <div className='home-chunk'>
                            <div className='home-chunk-item' onClick={()=>goPath('orga')}>
                                <div className='label-one'>部门</div>
                                <div className='info-one'>
                                    {count?.orgaNumber || 0}
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('user')}>
                                <div className='label-one'>用户</div>
                                <div className='info-one'>
                                    {count?.userNumber || 0}
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('userGroup')}>
                                <div className='label-one'>用户组</div>
                                <div className='info-one'>
                                    {count?.userGroupNumber || 0}
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('dir')}>
                                <div className='label-one'>用户目录</div>
                                <div className='info-one'>
                                    {count?.userDirNumber || 0}
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('permission')}>
                                <div className='label-one'>权限</div>
                                <div className='info-one'>
                                    {count?.roleNumber || 0}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='setting-home-chunk'>
                        <div className='home-title'>消息</div>
                        <div className='home-chunk'>
                            <div className='home-chunk-item' onClick={()=>goPath('message')}>
                                <div className='label-one'>消息通知方案</div>
                                <div className='info-one'>
                                    {count?.noticeNumber || 0}
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('messagesendtype')}>
                                <div className='label-one'>消息发送方式</div>
                                <div className='info-one'>
                                    {count?.sendTypeNumber || 0}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='setting-home-chunk'>
                        <div className='home-title'>应用与安全</div>
                        <div className='home-chunk'>
                            <div className='home-chunk-item' onClick={()=>goPath('backups')}>
                                <div className='home-chunk-label'>备份与恢复</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>上次备份时间</div>
                                    <div className='home-chunk-length'>{count?.lastBackupsTime || '无'}</div>
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('version')}>
                                <div className='home-chunk-label'>版本与许可证</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>版本类型</div>
                                    <div className='home-chunk-length'>{count?.version ? '社区版' : '企业版'}</div>
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('productAuth')}>
                                <div className='home-chunk-label'>应用访问权限</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>已授权</div>
                                    <div className='home-chunk-length'>{count?.applyAuthNumber || 0}</div>
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
