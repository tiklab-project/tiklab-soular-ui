import React, {useState, useEffect} from "react";
import {Select, Row, Col, Spin} from "antd";
import {getUser,productSelect} from 'thoughtware-core-ui';
import {findTodoCount, getTodoPageService} from "../store/homeStore";
import Page from '../../common/page/Page'
import BreadCrumb from "../../common/breadCrumb/BreadCrumb";
import Tabs from "../../common/tabs/Tabs";
import TodoList from "../../common/list/TodoList";
import './Todo.scss';


const pageSize = 20

/**
 * 待办
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Todo = props => {

    const {showTodo,setShowTodo} = props;

    const pageParam = {
        pageSize: pageSize,
        currentPage: 1,
    }

    //待办请求参数
    const [params,setParams] = useState({
        pageParam,
        status:showTodo?.status
    })
    //待办数据
    const [todoData,setTodoData] = useState([]);
    //待办分页
    const [todoPage,setTodoPage] = useState({});
    //加载状态
    const [spinning,setSpinning] = useState(false);
    //待办统计数据
    const [todoCount,setTodoCount] = useState({});
    //待办统计数据请求参数
    const [countParams,setCountParams] = useState(null);

    useEffect(() => {
        getTodoCount()
    }, [countParams]);

    const getTodoCount = () => {
        let value = {};
        if(countParams && countParams!=='all'){
            value = {bgroup: countParams}
        }
        findTodoCount({
            assignUserId:getUser().userId,
            ...value
        }).then(res=>{
            if(res.code===0){
                setTodoCount(res.data)
            }
        })
    }

    useEffect(()=>{
        getTodoList()
    },[params]);

    const getTodoList = () => {
        setSpinning(true)
        let value = {
            ...params,
            userId: getUser().userId
        }
        if(params?.status===0){
            delete value.status
        }
        if(params?.bgroup==='all'){
            delete value.bgroup
        }
        getTodoPageService(value).then(res=>{
            if (res.code === 0 ) {
                setTodoData(res.data.dataList);
                setTodoPage({
                    totalPage:res.data.totalPage,
                    totalRecord:res.data.totalRecord
                })
            }
            setSpinning(false)
        })
    }

    const changPage = page =>{
        setParams({
            ...params,
            pageParam: {
                pageSize: pageSize,
                currentPage: page,
            }
        })
    }

    const changeActive = (value,type) => {
        if(type==='bgroup'){
            setCountParams(value)
        }
        setParams({
            ...params,
            [type]:value,
            pageParam
        })
    }

    return(
        <Row className={'thoughtware_fulltodo'}>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "16", offset: "4" }}
                xxl={{ span: "14", offset: "5" }}
            >
                <Spin spinning={spinning}>
                    <div className='eas-home-limited'>
                        <BreadCrumb
                            firstItem={'待办'}
                            onClick={showTodo ? ()=>setShowTodo(null) :undefined}
                        />
                        <div className={'thoughtware_fulltodo-select'}>
                            <Tabs
                                type={params?.status ? params.status : 0}
                                tabLis={[
                                    {title: ((<>全部<span className='todo-count-number'>{todoCount?.allTodo || 0}</span></>)), id: 0},
                                    {title: ((<>进行<span className='todo-count-number'>{todoCount?.runTodo || 0}</span></>)), id: 1},
                                    {title: ((<>完成<span className='todo-count-number'>{todoCount?.finishTodo || 0}</span></>)), id: 2},
                                    {title: ((<>逾期<span className='todo-count-number'>{todoCount?.expireTodo || 0}</span></>)), id: 3},
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
                        <div className={'tab-content'}>
                            <TodoList todoList={todoData}/>
                            <Page
                                currentPage={params.pageParam.currentPage}
                                changPage={changPage}
                                page={todoPage}
                            />
                        </div>
                    </div>
                </Spin>
            </Col>
        </Row>

    )
};
export default Todo
