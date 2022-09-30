/**
 * @name: work
 * @author mahai
 * @date 2022/9/28 9:35 AM
 * @description work
 */
import React, {useEffect, useState} from "react";
import {NavBar, Empty} from 'antd-mobile'
import {RightOutline,} from 'antd-mobile-icons';
import {getUser, parseUserSearchParams} from "tiklab-core-ui";
import todoServer from "../../service/todoServer";
import opLogServer from "../../service/opLogServer";
import messageServer from "../../service/messageServer";
import './work.scss';


const Work = ({history}) => {

    const params = {
        pageParam:{
            pageSize: 5,
            currentPage:1
        },
        userId: getUser().userId
    }
    const messageParams = {
        receiver: getUser().userId,
        pageParam:{
            pageSize: 5,
            currentPage:1
        },
    }

    const [todoList,setTodoList] = useState([]);
    const [oplogList,setOpLogList] = useState([]);
    const [messageList,setMessageList] = useState([]);

    useEffect(() => {
        getTodoTask(params);
        getOplog(params);
        getMessage(messageParams)
    }, []);


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
