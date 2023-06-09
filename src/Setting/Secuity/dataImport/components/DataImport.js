import React,{useEffect,useState} from "react";
import {Input, Form, message, Select, Spin} from "antd";
import {LeftOutlined} from '@ant-design/icons';
import {inject,observer} from "mobx-react";
import Btn from "../../../../common/btn";
import {WORK_APP_SELECT} from "../../../../utils/constant";

import "./DataImport.scss";

/**
 * 数据导入
 * @param props
 * @constructor
 */
const DataImport = (props) => {

    const {dataImportStore} = props

    const {importData,findImportMessage} = dataImportStore

    const [form] = Form.useForm()

    // 进度展示
    const [pressVisible,setPressVisible] = useState(false)

    // 进度条内容
    const [press,setPress] = useState(null)

    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true)

    const [isLoading,setIsLoading] = useState(true)

    let interval
    useEffect(()=>{
        // 初始化导入消息
        doProcess()

        return ()=>{
            setPress(null)
            // 清除定时器
            clearInterval(interval)
            setPressVisible(false)
        }
    },[])

    /**
     * 导入
     */
    const imports = () => {
        form.validateFields().then(values => {
            // 显示导入详情
            setPressVisible(true)
            // 导入的数据
            importData(values)
            // 获取导入消息
            doProcess()
        })
    }

    /**
     * 开启进度定时器
     * @returns {Promise<void>}
     */
    const doProcess = () => {
        interval = setInterval(()=>findImportMessage().then(res=>{
            if(res.code===0){
                setPress(res.data)
                if(res.data.state){
                    setPressVisible(true)
                } else {
                    clearInterval(interval)
                }
            } else {
                message.info(res.msg)
                clearInterval(interval)
                setPressVisible(false)
            }
            setIsLoading(false)
        }),1000)
    }

    /**
     * 关闭进度蒙版
     */
    const closePress = () => {
        setPressVisible(false)
    }

    const renderPressLog = () => {
        const dataImport=document.getElementById("data-import")
        if(dataImport && isActiveSlide){
            dataImport.scrollTop = dataImport.scrollHeight
        }
        return press?.message || '暂无日志'
    }

    const renderResult = () => {
        if(press?.speed===100 && !press?.state){
            return <div className="info-right-success">成功</div>
        }
        if(press?.speed!==100 && !press?.state){
            return <div className="info-right-error">失败</div>
        }
        return <div className="info-right-run">运行中</div>
    }

    if(isLoading){
        return (
            <div className='data-import-loading'>
                <Spin size={'large'}/>
                <div className='data-import-loading-title'>加载中</div>
            </div>
        )
    }

    if(pressVisible){
        return (
            <div className="data-import">
                <div className="data-import-progress">
                    <div className="progress-content-up">
                        {
                            !press?.state &&
                            <span className='up-back' onClick={closePress}>
                                <LeftOutlined />
                            </span>
                        }
                        <span>数据导入</span>
                    </div>
                    <div className='progress-content-info'>
                        <div className='info-left'>
                            <div>
                                <span>产品类型：</span>
                                <span>{press?.database?.application}</span>
                                {/*<span>{renderApplication(press?.database?.application)}</span>*/}
                            </div>
                            <div>
                                <span>数据库链接地址:</span>
                                <span>{press?.database?.url}</span>
                            </div>
                        </div>
                        { renderResult() }
                    </div>
                    <div className='progress-content-title'>进度</div>

                    <div className='progress-content-bar'>
                        <div className="up-progress-bar">
                            <div className="progress-bar" style={{
                                width:`${press?.speed || 0}%`
                            }}/>
                        </div>
                        <div className='up-progress-desc'>{press?.speed || 0}%</div>
                    </div>
                    <div className='progress-content-title'>输出</div>

                    <div className='progress-content-log' id='data-import'
                         onWheel={()=>setIsActiveSlide(false)}
                    >
                        {renderPressLog()}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="data-import">
            <div className="data-import-data">
                <div className='data-content-up'>数据导入</div>
                <div className='data-content-form'>
                    <Form
                        form={form}
                        layout={"vertical"}
                        initialValues={{application:'matflow'}}
                    >
                        <Form.Item
                            label={'选择产品'}
                            name={'application'}
                            rules={[
                                {required:true,message:"数据库地址不能为空"},
                            ]}
                        >
                            <Select options={WORK_APP_SELECT}/>
                        </Form.Item>
                        <Form.Item
                            label={'数据库链接信息'}
                            name={'url'}
                            rules={[
                                {required:true,message:"数据库链接信息不能为空"},
                            ]}
                        >
                            <Input
                                autoComplete="off"
                                placeholder="数据库链接信息，如 jdbc:postgresql://192.168.10.1:5432/tiklab_eas"
                            />
                        </Form.Item>
                        <Form.Item
                            label={'用户名'}
                            name={'username'}
                            rules={[
                                {required:true,message:"用户名不能为空"},
                            ]}
                        >
                            <Input placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item
                            label={'密码'}
                            name={'password'}
                            rules={[
                                {required:true,message:"密码不能为空"},
                            ]}
                        >
                            <Input.Password placeholder="密码"/>
                        </Form.Item>
                    </Form>
                </div>
                <div className='data-content-btn'>
                    <Btn onClick={imports} type={"primary"} title={"导入"}/>
                </div>
            </div>
        </div>
    )
}

export default inject("dataImportStore")(observer(DataImport))
