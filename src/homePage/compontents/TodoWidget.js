import React, {useState, useEffect} from "react";
import { Tag, Empty, Button} from 'antd';
import {getUser, parseUserSearchParams} from 'tiklab-core-ui';
import {RightOutlined} from '@ant-design/icons';
import {getTodoPageService} from '../store/store';
import {ProductsTypeTab} from "./Common";
import Btn from '../../common/btn';
import messageEmpty from "../../assets/message.svg";
import './TodoWidget.scss';

/**
 * 代办
 * @returns {JSX.Element}
 * @constructor
 */
const   TodoWidget = props => {

    const {history,setMoreTodo} = props

    const [activeKey, setActiveKey] = useState('all')

    const [todoData,setTodoData] = useState([])

    const [total,setTotal] = useState(null)

    useEffect(() => {
        getTodoList()
    }, []);

    const getTodoList = async bgroup => {
        const res =  await getTodoPageService({
            userId: getUser().userId,
            pageParam:{
                pageSize:10,
                currentPage:1
            },
            bgroup
        });
        if (res.code === 0 ) {
            const data = res.data.dataList;
            setTodoData(data);
            setTotal(res.data.totalPage)
        }
    }

    const changRouter = (item) => {
        const {link} = item;
        if (link) {
            if(/^http|https/.test(link)){
                window.open(link+"?" + parseUserSearchParams({
                    ticket:getUser().ticket
                }))
            }
        }
    }

    const showStatusLabel = (status) => {
        switch (status) {
            case 1:
                return <Tag color="#87d068">进行中</Tag>
            case 2:
                return <Tag color="#108ee9">完成</Tag>
            case 3:
                return <Tag color="#f50">逾期</Tag>
        }
    }
    const changeTabActive = (tab) => {
        setActiveKey(tab.id)
        if (tab.id === 'all') {
            getTodoList()
        } else {
            getTodoList(tab.id)
        }
    }

    const renderLis = (item) => {
        return (
            <div className='item-todo' key={item.id} onClick={() => changRouter(item)}>
                <div className='item-todo-wrap'>
                    <div className='item-todo-title'>
                        {item.title}
                    </div>
                    <div className='item-todo-content' >
                        {item.remark}
                    </div>
                </div>
                <div className='time'>
                    {showStatusLabel(item.status)}
                    截止时间：{item.endTime}
                </div>
            </div>
        )
    }

    return(
        <div className={'todoWidget'}>
            <div className={'todoWidget-card'}>
                <div className="todoWidget-card-body">
                    <div className="todoWidget-card-body-header">
                        <div className="todoWidget-card-body-header-title">待办</div>
                        {
                            total > 1 &&
                            <Btn
                                type={'link'}
                                onClick={()=>setMoreTodo(true)}
                                icon={<RightOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}} />}
                            />
                        }
                    </div>
                    <div className="todoWidget-card-body-content">
                        <ProductsTypeTab
                            onClick={changeTabActive}
                            type={activeKey}
                        />
                        <div className='todo-content'>
                            {
                                todoData && todoData.length>0 ?
                                    todoData.map((item)=>renderLis(item))
                                    :
                                    <Empty
                                        imageStyle={{
                                            height: 120,
                                        }}
                                        description={<span style={{color:"#999",fontSize:13}}>没有日志</span>}
                                        image={messageEmpty}
                                    />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoWidget;
