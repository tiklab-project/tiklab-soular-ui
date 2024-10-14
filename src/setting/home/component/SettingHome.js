import React, {useState,useEffect} from "react";
import {Row,Col} from "antd";
import countStore from "../store/CountStore";
import {applySubscription, getUser} from "tiklab-core-ui";
import versionStore from "tiklab-licence-ui/es/version/VersionStore";
import vipLight from '../../../assets/images/vip-light.png';
import vipDark from '../../../assets/images/vip-dark.png';
import "./SettingHome.scss";
import moment from "moment";
import {
    ApartmentOutlined,
    UserOutlined,
    MessageOutlined,
    GroupOutlined,
    ScheduleOutlined,
    AlertOutlined,
    HistoryOutlined,
    LaptopOutlined,
} from "@ant-design/icons";
import {getOplogPageService} from '../../../home/store/HomeStore'

const SettingHome = props => {

    const {findCount} = countStore;
    const {findUseLicence} = versionStore;

    //系统设置统计数据
    const [count,setCount] = useState({});
    //当前版本
    const [licence,setLicence] = useState(null);
    //操作日志
    const [log,setLog] = useState(null);

    useEffect(()=>{
        findCount().then(res=>{
            if(res.code===0){
                setCount(res.data)
            }
        })
        findUseLicence().then(res=>{
            if(res.code===0){
                setLicence(res.data)
            }
        })
        getOplogPageService({
            pageParam: {pageSize: 1, currentPage: 1},
            userId:getUser().userId,
            bgroup:"soular",
        }).then(res=>{
            if(res.code===0){
                setLog(res.data)
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
                lg={{ span: "20" , offset: "2"  }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "16", offset: "4" }}
            >
                <div className='soular-home-limited'>
                    <div className='home-licence-box'>
                        <div className='home-licence'>
                            <div className='home-licence-item'>
                                <div className='home-licence-item-level'>
                                    <div className='licence-level-img'>
                                        <img src={count?.version===false ? vipLight:vipDark} alt={''}/>
                                    </div>
                                    <div>
                                        <div>
                                            <span className='licence-level-info'>{count?.version===false ? '企业版' : '社区版'}</span>
                                            {licence?.issuedTime &&
                                            <span className='licence-level-issuedTime'>
                                                {moment(licence.issuedTime).format('YYYY-MM-DD HH:mm:ss')}到期
                                            </span>}
                                        </div>
                                        <div className='licence-level-applyAuth' onClick={()=>goPath('productAuth')}>
                                            <span className='licence-level-applyAuth-title'>授权人数：</span>
                                            <span className='licence-level-info'>
                                                {count?.applyAuthNumber || 0 } / {count?.version === false ? licence?.userNum > 0 ? licence.userNum+'人' : "不限制" :"不限制" }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='home-licence-sub' onClick={()=>applySubscription('soular')}>
                                {count?.version === false ? '续订' : '订阅'}
                            </div>
                        </div>
                    </div>
                    <div className='home-chunk-box'>
                        <div className='home-user-box'>
                            <div className='home-title'>用户与权限</div>
                            <div className='home-user'>
                                <div className='home-user-item' onClick={()=>goPath('user')}>
                                    <div className='home-left'>
                                        <div className='home-icon'><UserOutlined/></div>
                                        <div className='home-label'>用户</div>
                                    </div>
                                    <div className='home-info'>
                                        {count?.userNumber || 0}
                                    </div>
                                </div>
                                <div className='home-user-item' onClick={()=>goPath('orga')}>
                                    <div className='home-left'>
                                        <div className='home-icon'><ApartmentOutlined /></div>
                                        <div className='home-label'>部门</div>
                                    </div>
                                    <div className='home-info'>
                                        {count?.orgaNumber || 0}
                                    </div>
                                </div>
                                <div className='home-user-item' onClick={()=>goPath('userGroup')}>
                                    <div className='home-left'>
                                        <div className='home-icon'><GroupOutlined /></div>
                                        <div className='home-label'>用户组</div>
                                    </div>
                                    <div className='home-info'>
                                        {count?.userGroupNumber || 0}
                                    </div>
                                </div>
                                <div className='home-user-item' onClick={()=>goPath('permission')}>
                                    <div className='home-left'>
                                        <div className='home-icon'><ScheduleOutlined /></div>
                                        <div className='home-label'>权限</div>
                                    </div>
                                    <div className='home-info'>
                                        {count?.roleNumber || 0}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='home-message-box'>
                            <div className='home-title'>消息</div>
                            <div className='home-message'>
                                <div className='home-message-item' onClick={()=>goPath('message')}>
                                    <div className='home-left'>
                                        <div className='home-icon'><MessageOutlined/></div>
                                        <div className='home-label'>消息通知方案</div>
                                    </div>
                                    <div className='home-info'>
                                        {count?.noticeNumber || 0}
                                    </div>
                                </div>
                                <div className='home-message-item' onClick={()=>goPath('messagesendtype')}>
                                    <div className='home-left'>
                                        <div className='home-icon'><AlertOutlined /></div>
                                        <div className='home-label'>消息发送方式</div>
                                    </div>
                                    <div className='home-info'>
                                        {count?.sendTypeNumber || 0}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='home-security-box'>
                            <div className='home-title'>安全</div>
                            <div className='home-security'>
                                <div className='home-security-item' onClick={()=>goPath('backups')}>
                                    <div className='home-left'>
                                        <div className='home-icon'><HistoryOutlined /></div>
                                        <div className='home-label'>上次备份时间</div>
                                    </div>
                                    <div className='home-info'>{count?.lastBackupsTime && moment(count.lastBackupsTime).format('YYYY-MM-DD') || '无'}</div>
                                </div>
                                <div className='home-security-item' onClick={()=>goPath('log')}>
                                    <div className='home-left'>
                                        <div className='home-icon'><LaptopOutlined /></div>
                                        <div className='home-label'>操作日志</div>
                                    </div>
                                    <div className='home-info'>{log?.totalRecord || '0'}</div>
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
