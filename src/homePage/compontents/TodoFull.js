import React, {useState, useEffect} from "react";
import { Select, Space, Empty,Tag} from "antd";
import {LeftOutlined} from '@ant-design/icons';
import {getUser, parseUserSearchParams} from 'tiklab-core-ui';
import {getTodoPageService} from "../store/store";
import messageEmpty from "../../assets/message.svg";
import './TodoFull.scss';
import Page from "../../common/page/Page";
import {ProductsTypeTab} from './Common'

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

    const getTodoList = async () => {
        const res =  await getTodoPageService({
            ...params,
            userId: getUser().userId
        });
        if (res.code === 0 ) {
            const data = res.data.dataList;
            setTodoData(data);
            setTodoPage({
                total:res.data.totalPage
            })
        }
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

    const onChangeProduct = (value) => {
        let newParams = {}
        if (value.id === 'all') {
            newParams = {
                pageParam,
            }
        } else {
            newParams = {
                ...params,
                pageParam,
                bgroup: value.id
            }
        }
        setParams(newParams)
    }

    const changPage = page =>{
        setParams({
            ...params,
            pageParam: {
                pageSize: 20,
                currentPage: page,
            }
        })
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

    const changRouter = (item) => {
        const {link} = item;
        if (link) {
            if(/^http|https/.test(link)){
                window.open(link+"?" + parseUserSearchParams(getUser()))

            }
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
        <div className={'tiklab_fulltodo'}>
            <div className='tiklab_fulltodo-content'>
                <Space className='tiklab_fulltodo-title'>
                    <LeftOutlined onClick={()=>setMoreTodo(false)} style={{fontSize: 'var(--tiklab-icon-size-16)',cursor: 'pointer'}}/>
                    <span className={'tiklab_fulltodo_nav'}>待办</span>
                </Space>
                <div className={'tiklab_fulltodo-select'}>
                    <ProductsTypeTab
                        onClick={onChangeProduct}
                        type={params.bgroup?params.bgroup:'all'}
                    />
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
                    {
                        todoPage && todoPage.total > 1 &&
                        <Page pageCurrent={params.pageParam.currentPage} changPage={changPage} page={todoPage}/>
                    }
                </div>
            </div>
        </div>

    )
};
export default TodoFull
