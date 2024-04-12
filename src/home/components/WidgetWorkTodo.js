import React, {useState, useEffect} from "react";
import {Select,Spin} from 'antd';
import {getUser,productSelect} from 'thoughtware-core-ui';
import {RightOutlined} from '@ant-design/icons';
import {getTodoPageService} from '../store/homeStore';
import Tabs from "../../common/tabs/Tabs";
import TodoList from "../../common/list/TodoList";

/**
 * 待办
 * @returns {JSX.Element}
 * @constructor
 */
const WidgetWorkTodo = props => {

    const {history} = props

    const [todoData,setTodoData] = useState([])

    const [params,setParams] = useState(null);
    const [spinning,setSpinning] = useState(false)

    useEffect(() => {
        getTodoList()
    }, [params]);

    const getTodoList = () => {
        setSpinning(true)
        getTodoPageService({
            userId: getUser().userId,
            pageParam:{
                pageSize:10,
                currentPage:1
            },
            ...params,
        }).then(res=>{
            if (res.code === 0 ) {
                setTodoData(res.data.dataList);
            }
            setSpinning(false)
        })
    }

    const changeActive = (value,type) => {
        if(value===0 || value==='all'){
            delete params[type]
            setParams({
                ...params,
            })
        }else {
            setParams({
                ...params,
                [type]:value,
            })
        }
    }

    return(
        <Spin spinning={spinning}>
            <div className="todoWidget">
                <div className="todoWidget-header">
                    <div className="todoWidget-header-title">待办</div>
                    <div onClick={()=>history.push('/todo')}>
                        <RightOutlined style={{color:"var(--thoughtware-blue)"}}/>
                    </div>
                </div>
                <div className="todoWidget-content">
                    <div className='todo-select'>
                        <Tabs
                            type={params?.status ? params.status : 0}
                            tabLis={[
                                {title: '全部', id: 0},
                                {title: '进行', id: 1},
                                {title: '完成', id: 2},
                                {title: '逾期', id: 3},
                            ]}
                            onClick={item=>changeActive(item.id,'status')}
                        />
                        <Select
                            options={[
                                {label: "全部应用", value: 'all'},
                                ...productSelect
                            ]}
                            value={params?.bgroup ? params.bgroup : 'all'}
                            onChange={value =>changeActive(value,'bgroup')}
                            style={{width: 150}}
                        />
                    </div>
                    <div className='todo-content'>
                        <TodoList todoList={todoData}/>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default WidgetWorkTodo;
