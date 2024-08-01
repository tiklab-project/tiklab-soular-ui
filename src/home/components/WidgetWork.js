import React,{useState,useEffect} from 'react';
import {Row, Col, message, Tag} from "antd";
import {inject,observer} from "mobx-react";
import {applyJump,product,productWhiteImg,productTitle} from "thoughtware-core-ui";
import AppLinkEdit from "thoughtware-licence-ui/es/appLink/component/AppLinkEdit";
import appLinkStore from "thoughtware-licence-ui/es/appLink/AppLinkStore";
import countStore from "../../setting/home/store/CountStore";
import WidgetWorkOplog from './WidgetWorkOplog';
import WidgetWorkTodo from "./WidgetWorkTodo";
import Btn from "../../common/btn/Btn";
import Oplog from "./Oplog";
import Todo from './Todo';
import './WidgetWork.scss';

/**
 * 工作台
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WidgetWork = props =>{

    const {homeStore} = props

    const {installApp,setInstallApp} = homeStore;
    const {findCount} = countStore;
    const {findAppLinkList} = appLinkStore;

    //显示动态
    const [showOplog,setShowOplog] = useState(false);
    //常用数据
    const [count,setCount] = useState({});
    //应用链接弹出框
    const [visible,setVisible] = useState(false);
    //配置链接编辑数据
    const [edit,setEdit] = useState(null);
    //显示待办
    const [showTodo,setShowTodo] = useState(null);

    /**
     * 编辑或创建应用配置成功后处理
     * @param app
     * @param type
     * @returns {Promise<void>}
     */
    const updateApp = async (app,type) => {
        const data = await findAppLinkList();
        if (data.length > 0 ) {
            setInstallApp(data)
            if(type==='clear'){setEdit({...data[0],edit:'edit'})}
            else {setEdit({...app,edit:'edit'})}
        }
        else {
            setInstallApp([])
            setEdit({edit:'add'})
        }
    }

    const goProject = code =>{
        const app = installApp?.find(item=>item.appType===code)
        if(app?.appUrl){
            applyJump(app.appUrl)
        }else {
            message.info('请先配置链接地址！')
        }
    }

    useEffect(()=>{
        findCount().then(res=>{
            if(res.code===0){
                setCount(res.data)
            }
        })
    },[])

    /**
     * 设置菜单
     * @param path
     */
    const toSetting = path => {
        props.history.push(`/setting/${path}`)
    }

    if(showOplog){
        return (
            <Oplog
                setShowOplog={setShowOplog}
            />
        )
    }

    if(showTodo){
        return (
            <Todo
                showTodo={showTodo}
                setShowTodo={setShowTodo}
            />
        )
    }

    return (
        <Row className='workLayout'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "16", offset: "4" }}
            >
                <div className="eas-home-limited">
                    <div className="product_widget">
                        <div className="product_widget-card">
                            <div className="workLayout-guide">
                                <div className="workLayout-title">应用</div>
                                <div className='workLayout-guide-link' onClick={()=>setVisible(true)}>
                                    配置
                                </div>
                                <AppLinkEdit
                                    edit={edit}
                                    setEdit={setEdit}
                                    visible={visible}
                                    setVisible={setVisible}
                                    applications={installApp}
                                    setApps={updateApp}
                                />
                            </div>
                            <div className="product_card-content">
                                <div className="product_card-content-wrap">
                                    {
                                        product.map(code => {
                                            if(code==='eas') return;
                                            return(
                                                <div key={code} className='product_card-item clicked' onClick={()=>goProject(code)}>
                                                    <div className="product_card-item_img">
                                                        <img src={productWhiteImg[code]} width={40} height={40} alt={""}/>
                                                        {
                                                            code==='xmonitor' &&
                                                            <div className='product_card-item_beta'><Tag color="green">beta</Tag></div>
                                                        }
                                                    </div>
                                                    <div className="product_card-item_title">{productTitle[code]}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='quick-entry'>
                        <div className='workLayout-guide'>
                            <div className='workLayout-title'>
                                用户概况
                            </div>
                        </div>
                        <div className='quick-entry-content'>
                            <div className='quick-entry-item' onClick={()=>toSetting('user')}>
                                <div>{count?.userNumber || 0}</div>
                                <div>用户</div>
                            </div>
                            <div className='quick-entry-item' onClick={()=>toSetting('orga')}>
                                <div>{count?.orgaNumber || 0}</div>
                                <div>部门</div>
                            </div>
                            <div className='quick-entry-item' onClick={()=>toSetting('userGroup')}>
                                <div>{count?.userGroupNumber || 0}</div>
                                <div>用户组</div>
                            </div>
                            <div className='quick-entry-item' onClick={()=>toSetting('permission')}>
                                <div>{count?.roleNumber || 0}</div>
                                <div>权限</div>
                            </div>
                        </div>
                    </div>
                    <WidgetWorkTodo
                        {...props}
                        setShowTodo={setShowTodo}
                    />
                    <WidgetWorkOplog
                        {...props}
                        setShowOplog={setShowOplog}
                    />
                </div>
            </Col>
        </Row>
    )
}


export default inject("homeStore")(observer(WidgetWork))
