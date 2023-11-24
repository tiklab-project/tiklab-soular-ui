import React, {useState, useEffect} from "react";
import {Empty} from 'antd';
import {getUser,applyJump} from 'tiklab-core-ui';
import {RightOutlined} from '@ant-design/icons';
import {getTodoPageService} from '../store/store';
import Btn from '../../common/btn';
import messageEmpty from "../../assets/message.svg";
import './TodoWidget.scss';

/**
 * 代办
 * @returns {JSX.Element}
 * @constructor
 */
const TodoWidget = props => {

    const [todoData,setTodoData] = useState([])

    const [total,setTotal] = useState(null)

    useEffect(() => {
        getTodoList()
    }, []);

    const getTodoList = () => {
        getTodoPageService({
            userId: getUser().userId,
            pageParam:{
                pageSize:10,
                currentPage:1
            },
            bgroup:'eas'
        }).then(res=>{
            if(res.code===0){
                const data = res.data.dataList;
                setTodoData(data);
                setTotal(res.data.totalPage)
            }
        })
    }

    const changRouter = (item) => {
        const {link} = item;
        if (link && /^http|https/.test(link)) {
            applyJump(link)
        }
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
                                onClick={()=>props.history.push('/todo')}
                                icon={<RightOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}} />}
                            />
                        }
                    </div>
                    <div className="todoWidget-card-body-content">
                        <div className='todo-content'>
                            {
                                todoData && todoData.length>0 ?
                                    todoData.map((item)=>(
                                        <div className='item-todo' key={item.id} onClick={() => changRouter(item)}>
                                            <div dangerouslySetInnerHTML={{__html: item.data}}/>
                                        </div>
                                    ))
                                    :
                                    <Empty
                                        imageStyle={{
                                            height: 120,
                                        }}
                                        description={<span style={{color:"#999",fontSize:13}}>没有代办</span>}
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
