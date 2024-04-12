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
                                <div className='home-chunk-label'>部门</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>部门</div>
                                    <div className='home-chunk-length'>{count?.orgaNumber || 0}</div>
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('user')}>
                                <div className='home-chunk-label'>用户</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>用户</div>
                                    <div className='home-chunk-length'>{count?.userNumber || 0}</div>
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('userGroup')}>
                                <div className='home-chunk-label'>用户组</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>用户组</div>
                                    <div className='home-chunk-length'>{count?.userGroupNumber || 0}</div>
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('dir')}>
                                <div className='home-chunk-label'>用户目录</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>用户目录</div>
                                    <div className='home-chunk-length'>{count?.userDirNumber || 0}</div>
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('permission')}>
                                <div className='home-chunk-label'>权限</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>权限</div>
                                    <div className='home-chunk-length'>{count?.roleNumber || 0}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='setting-home-chunk'>
                        <div className='home-title'>消息</div>
                        <div className='home-chunk'>
                            <div className='home-chunk-item' onClick={()=>goPath('message')}>
                                <div className='home-chunk-label'>消息通知方案</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>消息通知方案</div>
                                    <div className='home-chunk-length'>{count?.noticeNumber || 0}</div>
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('messagesendtype')}>
                                <div className='home-chunk-label'>消息发送方式</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>消息发送方式</div>
                                    <div className='home-chunk-length'>{count?.sendTypeNumber || 0}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='setting-home-chunk'>
                        <div className='home-title'>插件</div>
                        <div className='home-chunk'>
                            <div className='home-chunk-item' onClick={()=>goPath('plugin')}>
                                <div className='home-chunk-label'>插件</div>
                                <div className='home-chunk-info home-chunk-wrap'>
                                    <div className='home-chunk-wrap-inline'>
                                        <div className='home-chunk-desc'>已安装</div>
                                        <div className='home-chunk-length'>{count?.installPluginNumber || 0}</div>
                                    </div>
                                    <div className='home-chunk-wrap-inline'>
                                        <div className='home-chunk-desc home-chunk-right'>插件市场</div>
                                        <div className='home-chunk-length'>{count?.shopPluginNumber || 0}</div>
                                    </div>
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
