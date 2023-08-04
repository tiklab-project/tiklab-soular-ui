import React, {useState, useEffect} from "react";
import { Select, Space, Empty} from "antd";
import {LeftOutlined} from '@ant-design/icons';
import {getUser} from 'tiklab-core-ui';
import {getTodoPageService} from "../store/store";
import messageEmpty from "../../assets/message.svg";
import './TodoFull.scss';
import Page from "../../common/page/Page";

/**
 * 代办
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TodoFull = props => {

    const {setMoreTodo} = props

    const [pageParam] = useState({
        pageSize: 20,
        currentPage: 1,
    })

    const [params,setParams] = useState({pageParam})
    const [todoData,setTodoData] = useState([]);
    const [todoPage,setTodoPage] = useState({})

    useEffect(()=>{
        getTodoList()
    },[params]);

    const getTodoList = () => {
        getTodoPageService({
            ...params,
            userId: getUser().userId,
            bgroup:'eas'
        }).then(res=>{
            if (res.code === 0 ) {
                const data = res.data.dataList;
                setTodoData(data);
                setTodoPage({
                    total:res.data.totalPage
                })
            }
        })
    }

    const handleChange = (value) => {
        let changeParams = {};
        if (value === 0) {
            changeParams = {
                ...params,
                pageParam,
            }
        } else {
            changeParams = {
                ...params,
                pageParam,
                status:value
            }
        }
        setParams(changeParams)
    };

    const changPage = page =>{
        setParams({
            ...params,
            pageParam: {
                pageSize: 20,
                currentPage: page,
            }
        })
    }

    const changRouter = (item) => {
        const {link} = item;
        if (link) {
            props.history.push(link.split("#")[1])
        }
    }

    return(
        <div className={'tiklab_fulltodo'}>
            <div className='tiklab_fulltodo-content'>
                <Space className='tiklab_fulltodo-title'>
                    <LeftOutlined onClick={()=>setMoreTodo(false)} style={{fontSize: 'var(--tiklab-icon-size-16)',cursor: 'pointer'}}/>
                    <span className={'tiklab_fulltodo_nav'}>待办</span>
                </Space>
                <div className={'tiklab_fulltodo-select'}>
                    <Select
                        options={[
                            {value: 0, label: "所有状态",},
                            {label: "进行中", value: 1},
                            {label: "完成", value: 2},
                            {label: "逾期", value: 3}
                        ]}
                        placeholder={'待办状态'}
                        onChange={handleChange}
                        defaultValue={0}
                        style={{width:240}}
                    />

                </div>
                <div className={'tab-content'}>
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
                    <Page
                        pageCurrent={params.pageParam.currentPage}
                        changPage={changPage}
                        page={todoPage}
                    />
                </div>
            </div>
        </div>

    )
};
export default TodoFull
