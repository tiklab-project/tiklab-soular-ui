import React, {useState, useEffect} from "react";
import {Spin} from 'antd';
import {getUser} from 'thoughtware-core-ui';
import {RightOutlined} from '@ant-design/icons';
import {findTodoCount} from '../store/HomeStore';
import todo from '../../assets/todo.svg';
import todoFinish from '../../assets/todoFinish.svg';
import todoOverdue from '../../assets/todoOverdue.svg';
import todoProgress from '../../assets/todoProgress.svg';

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
                        <img src={todo} alt={''}/>
                        <div>
                            <div className='widget-todo-item-num'>{todoData?.allTodo  || 0}</div>
                            <div className='widget-todo-item-text'>全部待办</div>
                        </div>
                    </div>
                    <div className='widget-todo-item' onClick={()=>goTodo(1)}>
                        <img src={todoProgress} alt={''}/>
                        <div>
                            <div className='widget-todo-item-num'>{todoData?.runTodo || 0}</div>
                            <div className='widget-todo-item-text'>进行中</div>
                        </div>
                    </div>
                    <div className='widget-todo-item' onClick={()=>goTodo(2)}>
                        <img src={todoFinish} alt={''}/>
                        <div>
                            <div className='widget-todo-item-num'>{todoData?.finishTodo || 0}</div>
                            <div className='widget-todo-item-text'>已完成</div>
                        </div>
                    </div>
                    <div className='widget-todo-item' onClick={()=>goTodo(3)}>
                        <img src={todoOverdue} alt={''}/>
                        <div>
                            <div className='widget-todo-item-num'>{todoData?.expireTodo || 0}</div>
                            <div className='widget-todo-item-text'>逾期</div>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default WidgetWorkTodo;
