import React,{useEffect,useState,useRef} from "react";
import {Input, Form, message, Select, Spin,Row,Col} from "antd";
import Button from "../../../../common/component/button/Button";
import BreadCrumb from "../../../../common/component/breadCrumb/BreadCrumb";
import {productTitle, productSelect} from "tiklab-core-ui";
import dataImportStore from "../store/DataImportStore";

import "./DataImport.scss";
import {DownOutlined, ImportOutlined, RightOutlined} from "@ant-design/icons";

/**
 * 用户数据导入页面
 * @param props
 * @constructor
 */
const DataImport = (props) => {

    const {importData,findImportMessage} = dataImportStore

    const [form] = Form.useForm();

    const pressRef = useRef();

    // 进度条内容
    const [press,setPress] = useState(null)
    // 进度展示状态
    const [pressVisible,setPressVisible] = useState(false)
    // 进度日志滚动状态
    const [isActiveSlide,setIsActiveSlide] = useState(true)
    // 加载状态
    const [isLoading,setIsLoading] = useState(true)
    //树的展开与闭合
    const [expandedTree,setExpandedTree] = useState([])

    useEffect(()=>{
        if(pressRef?.current && isActiveSlide){
            pressRef.current.scrollTop = pressRef.current.scrollHeight
        }
    },[isActiveSlide,press?.message])

    let interval
    useEffect(()=>{
        // 初始化导入消息
        doProcess()

        return ()=>{
            setPress(null)
            // 清除定时器
            clearInterval(interval)
            setIsLoading(true)
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
            // 加载状态
            setIsLoading(true)
            // 导入的数据
            importData(values)
            // 获取导入消息
            doProcess()
            // 清空表单
            form.resetFields(null)
        })
    }

    /**
     * 开启进度定时器
     */
    const doProcess = () => {
        findImportMessage().then(res=>{
            if(res.code===0 && res.data.state){
                setPress(res.data)
                setPressVisible(true)
                findInter()
            }
        }).finally(()=>setIsLoading(false))
    }

    /**
     * 开启定时器
     */
    const findInter = () =>{
        clearInterval(interval)
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
        }).finally(()=>setIsLoading(false)),1000)
    }

    /**
     * 鼠标滚轮滑动事件
     */
    const onWheel = () => {
        if(!isActiveSlide) return
        setIsActiveSlide(false)
    }

    let startScrollTop  = 0;

    /**
     * 鼠标左键事件获取内容区域初始滚动位置
     * @param e
     */
    const handleMouseDown = e =>{
        if(e.button===0){
            if(!isActiveSlide) return
            startScrollTop  = pressRef.current.scrollTop;
        }
    }


    /**
     * 结束滚动位置
     * @param e
     */
    const handleMouseUp = e => {
        if(e.button===0){
            if(!isActiveSlide) return
            const endScrollTop = pressRef.current.scrollTop;
            if(startScrollTop !== endScrollTop) {
                setIsActiveSlide(false)
            }
        }
    }

    /**
     * 关闭进度详情
     */
    const closePress = () => {
        setPressVisible(false)
    }

    /**
     * 是否符合要求
     * @param key
     * @returns {boolean}
     */
    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    /**
     * 展开和闭合
     * @param key
     */
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            // false--闭合
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            // ture--展开
            setExpandedTree(expandedTree.concat(key))
        }
    }

    // 运行结果
    const renderResult = () => {
        if(press?.speed===100 && !press?.state){
            return <div className="info-right-success">成功</div>
        }
        if(press?.speed!==100 && !press?.state){
            return <div className="info-right-error">失败</div>
        }
        return <div className="info-right-run">运行中</div>
    }

    // 加载状态
    if(isLoading){
        return (
            <div className='data-import-loading'>
                <Spin size='large' />
                <div className='data-import-loading-title'>加载中</div>
            </div>
        )
    }

    // 进度详情
    if(pressVisible){
        return (
            <Row className="data-import">
                <Col
                    xs={{ span: "24" }}
                    sm={{ span: "24" }}
                    md={{ span: "24" }}
                    lg={{ span: "18", offset: "3" }}
                    xl={{ span: "18", offset: "3" }}
                    xxl={{ span: "18", offset: "3" }}
                >
                    <div className="soular-home-limited data-import-progress">
                        <BreadCrumb
                            firstItem={"用户导入"}
                            onClick={press?.state?null:closePress}
                        />
                        <div className='progress-content-info'>
                            <div className='info-left'>
                                <div>
                                    <span>产品类型：</span>
                                    <span>{productTitle[press?.database?.application]}</span>
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
                        <div className='progress-content-log'
                             ref={pressRef}
                             onWheel={onWheel}
                             onMouseDown={handleMouseDown}
                             onMouseUp={handleMouseUp}
                        >
                            { press?.message || '暂无日志' }
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }

    const lis = [
        {
            key:1,
            title:"用户导入",
            desc: "数据导入",
            icon: <ImportOutlined />,
            content: (
                <div className="bottom-import">
                    <Form
                        form={form}
                        layout={"vertical"}
                        initialValues={{application:'arbess'}}
                    >
                        <Form.Item
                            label={'选择产品'}
                            name={'application'}
                            rules={[
                                {required:true,message:"数据库地址不能为空"},
                            ]}
                        >
                            <Select options={productSelect}/>
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
                                placeholder="数据库链接信息，如 jdbc:postgresql://192.168.10.1:5432/tiklab_soular"
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
                    <div>
                        <Button onClick={()=>setOpenOrClose(1)} isMar={true}>
                            取消
                        </Button>
                        <Button onClick={imports} type={"primary"}>
                            导入
                        </Button>
                    </div>
                </div>
            )
        },
    ]

    return (
        <Row className="data-import">
            <Col
                xs={{span: "24"}}
                sm={{span: "24"}}
                md={{span: "24"}}
                lg={{ span: "18", offset: "3" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="soular-home-limited">
                    <BreadCrumb firstItem={"用户导入"}/>
                    <div className="data-import-ul">
                        {
                            lis.map(item=> (
                                <div key={item.key} className="data-import-li">
                                    <div className={`data-import-li-top ${isExpandedTree(item.key) ?"data-import-li-select":"data-import-li-unselect"}`}
                                         onClick={()=>setOpenOrClose(item.key)}
                                    >
                                        <div className="data-import-li-icon">{item.icon}</div>
                                        <div className="data-import-li-center">
                                            <div className="data-import-li-title">{item.title}</div>
                                            {
                                                !isExpandedTree(item.key) &&
                                                <div className="data-import-li-desc">{item.desc}</div>
                                            }
                                        </div>
                                        <div className="data-import-li-down">
                                            { isExpandedTree(item.key)? <DownOutlined />:<RightOutlined /> }
                                        </div>
                                    </div>
                                    <div className={`${isExpandedTree(item.key)? "data-import-li-bottom":"data-import-li-none"}`}>
                                        { isExpandedTree(item.key) && item.content }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default DataImport
