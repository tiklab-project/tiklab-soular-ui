import React, {useState, useEffect} from "react";
import {Spin} from 'antd';
import {getUser} from 'thoughtware-core-ui';
import {RightOutlined} from '@ant-design/icons';
import {findTodoCount} from '../store/homeStore';

/**
 * 待办
 * @returns {JSX.Element}
 * @constructor
 */
const WidgetWorkTodo = props => {

    const {setShowTodo} = props

    //待办统计数据
    const [todoData,setTodoData] = useState([])
    //加载状态
    const [spinning,setSpinning] = useState(false);

    useEffect(() => {
        getTodoList()
    }, []);

    const getTodoList =  () => {
        setSpinning(true)
        findTodoCount({
            assignUserId:getUser().userId
        }).then(res=>{
            if(res.code===0){
                setTodoData(res.data)
            }
            setSpinning(false)
        })
    }

    const goTodo = (status) => {
        setShowTodo({
            visible:true,
            status,
        })
    }

    return(
        <Spin spinning={spinning}>
            <div className="todoWidget">
                <div className="workLayout-guide">
                    <div className="workLayout-title">待办事项</div>
                    <div className="workLayout-guide-right" onClick={()=>goTodo(0)}>
                        <RightOutlined />
                    </div>
                </div>
                <div className="todoWidget-content">
                    <div className='widget-todo-item' onClick={()=>goTodo(0)}>
                        <div>{todoData?.allTodo  || 0}</div>
                        <div>全部</div>
                    </div>
                    <div className='widget-todo-item' onClick={()=>goTodo(1)}>
                        <div>{todoData?.runTodo || 0}</div>
                        <div>进行</div>
                    </div>
                    <div className='widget-todo-item' onClick={()=>goTodo(2)}>
                        <div>{todoData?.finishTodo || 0}</div>
                        <div>完成</div>
                    </div>
                    <div className='widget-todo-item' onClick={()=>goTodo(3)}>
                        <div>{todoData?.expireTodo || 0}</div>
                        <div>逾期</div>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default WidgetWorkTodo;
