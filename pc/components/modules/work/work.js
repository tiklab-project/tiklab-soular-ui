/**
 * @name: work
 * @author: mahai
 * @date: 2021-05-24 09:38
 * @description：work
 * @update: 2021-05-24 09:38
 */
import React, {useState, useEffect}  from 'react';
import {getUser, parseUserSearchParams} from 'doublekit-core-ui'
import {projectImg, apiboxImg, jenkinsImg, knowledgeImg} from 'doublekit-eam-ui'
import {Col, Row, Card, Button} from 'antd';
import {LinkOutlined, ProfileOutlined, SettingOutlined} from "@ant-design/icons";

import AddWorkBench from "./components/workBenchAdd";
import WorkService from './service/workService'
import './work.scss'

const { Meta } = Card;

const INIT_WORK = [
    {
        appType: 'apibox',
        label: "API BOX",
        description: "接口自动化测试",
        img:apiboxImg,
        appUrl:"",
        id:"1"
    },
    {
        appType: 'project',
        label: "项目管理",
        description: "项目管理系统",
        img:projectImg,
        appUrl:"",
        id:"2"
    },
    {
        appType: 'jtest',
        label: "Jtest",
        description: "Jtest系统",
        img:knowledgeImg,
        appUrl:"",
        id:"3"
    },
    {
        appType: 'wiki',
        label: "知识库",
        description: "知识库系统",
        img:knowledgeImg,
        appUrl:"",
        id:"4"
    },
    {
        appType: 'pipleine',
        label: "自动化部署",
        description: "自动化部署系统",
        img:jenkinsImg,
        appUrl:"",
        id:"5"
    },
]

const Work = (props) => {
    const [applications, setApplications] = useState([]);
    const [visible, setVisible] = useState(false);
    const [edit,setEdit] = useState(null);

    const user = getUser();
    useEffect(() => {
        getWorkList().then(r => {})
    }, [])



    const getWorkList = async () => {
        const data = await WorkService.getWorkList();
        const updateData = INIT_WORK.map(item => {
            const code = item.appType;
            const index= data.findIndex(d => d.appType === code);
            if (index>-1) {
                return {
                    ...item,
                    appUrl:data[index].appUrl,
                    id: data[index].id,
                }
            }
            return item
        })
        setApplications(updateData)
    }

    const onEdit = (item) => {
        setEdit(item);
        setVisible(true)
    }

    return (
        <section className='workLayout'>
            <section className={'workLayout-content'}>
                <div className={'dashboard'}>
                    <div className={'dashboard-left'}>
                        <div className={'dashboard-card'}>
                            <div className='dashboard-card-body'>
                                <div className={'card'}>
                                    <div className="card-header">
                                        <div className="card-header-title">最近访问的用例</div>
                                    </div>
                                    <div className={'card-content card-contentleft'}>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'dashboard-card'}>
                            <div className='dashboard-card-body'>
                                <div className={'card'}>
                                    <div className="card-header">
                                        <div className="card-header-title">工作事项</div>
                                    </div>
                                    <div className={'card-content card-contentleft'}>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'dashboard-card'}>
                            <div className='dashboard-card-body'>
                                <div className={'card'}>
                                    <div className="card-header">
                                        <div className="card-header-title">最近访问的项目</div>
                                    </div>
                                    <div className={'card-content card-contentleft'}>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={'dashboard-right'}>
                        <div className={'dashboard-card'}>
                            <div className='dashboard-card-body'>
                                <div className={'card'}>
                                    <div className="card-header">
                                        <div className="card-header-title">切换产品空间</div>
                                    </div>
                                    <div className={'card-content'}>
                                        <div className={'card-content-wrap'}>
                                            {
                                                applications.map(item => {
                                                    const url = user.ticket ? `${item.appUrl}?${parseUserSearchParams(user)}` : item.appUrl;
                                                    return (
                                                        <div key={item.id}>
                                                            <a className={'card-item'} href={url}>
                                                                <div className={'card-item_img'}>
                                                                    <img src={item.img} width={44} height={44}/>
                                                                </div>
                                                                <div className={'card-item_title'}>{item.label}</div>
                                                                <div className={'card-item_desc'}>{item.label}</div>
                                                            </a>
                                                            {/*<div className="action">*/}
                                                            {/*    <SettingOutlined key="setting" onClick={() => onEdit(item)}/>*/}
                                                            {/*</div>*/}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className='dashboard-card-body'>
                                <div className={'card'}>
                                    <div className="card-header">
                                        <div className="card-header-title">我的事项</div>
                                        <Button>查看全部</Button>
                                    </div>
                                    <div className={'card-content'}>
                                        <div className="myproject">
                                            <div className="myproject_create">
                                                <img src="https://img.alicdn.com/imgextra/i4/O1CN01CuyjHZ1MdLmS5Y8vd_!!6000000001457-2-tps-486-176.png" alt=""/>
                                                <img src="https://img.alicdn.com/imgextra/i3/O1CN01gBbRck1ygVuckHMfz_!!6000000006608-2-tps-204-176.png" alt="" />
                                            </div>
                                            <div className={'projectList'}>
                                                <span className="icon">
                                                    <img src="https://img.alicdn.com/imgextra/i4/O1CN013XKqUi1MLwhFirv1o_!!6000000001419-2-tps-96-96.png"/>
                                                </span>
                                                <span className="projectList_title">
                                                    <div className="teamix-title">
                                                        <span className="CardList--titleButton--1ZNm0Ez">敏捷研发示例项目</span>
                                                    </div>
                                                </span>
                                                <span className='iconType'>
                                                    <ProfileOutlined style={{fontSize:20}}/>
                                                    <span className="iconNumber">10</span>
                                                </span>
                                                <span className='iconType'>
                                                    <ProfileOutlined style={{fontSize:20}}/>
                                                    <span className="iconNumber">10</span>
                                                </span>
                                                <span className='iconType'>
                                                    <ProfileOutlined style={{fontSize:20}}/>
                                                    <span className="iconNumber">10</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className='dashboard-card-body'>
                                <div className={'card'}>
                                    <div className="card-header">
                                        <div className="card-header-title">我的代码库</div>
                                        <Button>查看全部</Button>
                                    </div>
                                    <div className={'card-content'}>
                                        <div style={{minHeight:200}} >
                                            <div className={'list_item'}>
                                                <div className="list_item_name"><span>Codeup-Demo</span></div>
                                                <div className="list_item_visibility">
                                                    <div className="list_item_visibility_center">
                                                        <div className="tag">
                                                            <span className="aone-tag-body">企业可见</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="list_item_updated"><span>2022-06-10</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <AddWorkBench
                visible={visible}
                setVisible={() => {
                    setVisible(false);
                    getWorkList()
                }}
                edit={edit}
            />
        </section>
    )
}
export default Work
