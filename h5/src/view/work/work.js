/**
 * @name: work
 * @author mahai
 * @date 2022/9/28 9:35 AM
 * @description work
 */
import React, {useEffect, useState} from "react";
import {NavBar, Empty, Grid} from 'antd-mobile'
import {AddOutline, RightOutline,} from 'antd-mobile-icons';
import {getUser, parseUserSearchParams} from "tiklab-core-ui";
import apiboxImg from 'tiklab-eam-ui/es/assests/img/apibox.png';
import jenkinsImg from 'tiklab-eam-ui/es/assests/img/jenkins.png';
import knowledgeImg from 'tiklab-eam-ui/es/assests/img/apibox.png';
import projectImg from 'tiklab-eam-ui/es/assests/img/project.png';
import todoServer from "../../service/todoServer";
import opLogServer from "../../service/opLogServer";
import messageServer from "../../service/messageServer";
import WorkService from "../../service/workService";

import './work.scss';

const INIT_WORK = [
    {
        appType: 'postin',
        label: "PostIn",
        description: "接口自动化测试",
        img:apiboxImg,
        appUrl:"",
        id:"1"
    },
    {
        appType: 'teamwire',
        label: "TeamWire",
        description: "项目管理系统",
        img:projectImg,
        appUrl:"",
        id:"2"
    },
    {
        appType: 'teston',
        label: "TestOn",
        description: "Jtest系统",
        img:knowledgeImg,
        appUrl:"",
        id:"3"
    },
    {
        appType: 'kanass',
        label: "Kanass",
        description: "知识库系统",
        img:knowledgeImg,
        appUrl:"",
        id:"4"
    },
    {
        appType: 'matflow',
        label: "MatFlow",
        description: "自动化部署系统",
        img:jenkinsImg,
        appUrl:"",
        id:"5"
    },
]

const Work = ({history}) => {

    const user = getUser();
    const params = {
        pageParam:{
            pageSize: 5,
            currentPage:1
        },
        userId: user.userId
    }
    const messageParams = {
        receiver: user.userId,
        pageParam:{
            pageSize: 5,
            currentPage:1
        },
    }
    const [projectList,setProjectList] = useState([]);
    const [todoList,setTodoList] = useState([]);
    const [oplogList,setOpLogList] = useState([]);
    const [messageList,setMessageList] = useState([]);

    useEffect(async () => {
       await getTodoTask(params);
       await getOplog(params);
       await getMessage(messageParams);
       await getProductList();
    }, []);

    const getProductList = async () => {
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
            return null;
        }).filter(d=>d);
        setProjectList(updateData)
    }

    const getTodoTask = async (data) => {
       const response = await todoServer.getTodoPage(data);
        if (response.code === 0) {
            setTodoList(response.data.dataList)
        }
    }

    const getMessage = async (data) => {
        const response = await messageServer.getMessageList(data);
        if (response.code === 0) {
            setMessageList(response.data.dataList)
        }
    }

    const getOplog = async (data) => {
        const response = await opLogServer.getOplogPage(data);
        if (response.code === 0) {
            setOpLogList(response.data.dataList)
        }
    }

    const logOplogRouter = (item) => {
        const {opLogTemplate} = item;
        if (opLogTemplate.link) {
            window.open(opLogTemplate.link+"?" + parseUserSearchParams(getUser()))
        }
    }

    return(
        <div className={'dashboard'}>
            <NavBar
                backArrow={false}
            >
                工作台
            </NavBar>
            <div className={'dashboard_body'}>

                <div className={'card'}>
                    <div className={'card_header'} onClick={() => {history.push('/project/add')}}>
                        产品空间
                        <AddOutline/>
                    </div>
                    <div className={'card_content project'}>
                        {
                            projectList.length === 0 &&  <Empty/>
                        }
                        <Grid columns={3} gap={8}>
                            {

                                projectList.map(item => {
                                    const url = user.ticket ? `${item.appUrl}?${parseUserSearchParams(user)}` : item.appUrl;
                                    return(
                                        <Grid.Item>
                                            <div key={item.id}>
                                                <a href={url} className={'project_item'}>
                                                    <div>
                                                        <img src={item.img} width={44} height={44} alt={item.label}/>
                                                    </div>
                                                    <div>{item.label}</div>
                                                </a>
                                            </div>
                                        </Grid.Item>
                                    )
                                })
                            }
                        </Grid>

                    </div>
                </div>

                <div className={'card'}>
                    <div className={'card_header'} onClick={() => {history.push('/todolist')}}>
                        待办任务
                        <RightOutline/>
                    </div>
                    <div className={'card_content'}>
                        {
                            todoList.length === 0 &&  <Empty/>
                        }
                        {
                            todoList.map(item => {
                                const url = user.ticket ? `${item.appUrl}?${parseUserSearchParams(user)}` : item.appUrl;

                                return(
                                    <div key={item.id} className={'card_content_item'}>
                                        <div>
                                            {item.title}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={'card'}>
                    <div className={'card_header'} onClick={() => {history.push('/messagelist')}}>
                        消息列表
                        <RightOutline/>
                    </div>
                    <div className={'card_content'}>
                        {
                            messageList.length === 0 &&  <Empty/>
                        }
                        {
                            messageList.map(item => {
                                let jsonData = {
                                    title:item.messageTemplate.title,
                                    status:item.status,
                                    receiveTime:item.receiveTime
                                }
                                return(
                                    <div key={item.id} className={'card_content_item'}>
                                        <div>
                                            {jsonData.title}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={'card'}>
                    <div className={'card_header'} onClick={() => {history.push('/oploglist')}}>
                        日志列表
                        <RightOutline/>
                    </div>
                    <div className={'card_content'}>
                        {
                            oplogList.length === 0 &&  <Empty/>
                        }
                        {
                            oplogList.map(item => {
                                return(
                                    <div key={item.id} className={'card_content_item'} onClick={() => logOplogRouter(item)}>
                                        <div dangerouslySetInnerHTML={{__html: item.opLogTemplate.content}}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Work;
