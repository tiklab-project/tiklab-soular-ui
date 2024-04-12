import React, {useState, useEffect} from "react";
import {Select, Row, Col, Spin} from "antd";
import {getUser,productSelect} from 'thoughtware-core-ui';
import {getTodoPageService} from "../store/homeStore";
import Page from '../../common/page/Page'
import BreadCrumb from "../../common/breadCrumb/BreadCrumb";
import Tabs from "../../common/tabs/Tabs";
import TodoList from "../../common/list/TodoList";
import './Todo.scss';

/**
 * 待办
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Todo = props => {

    const pageParam = {
        pageSize: 20,
        currentPage: 1,
    }

    const [params,setParams] = useState({pageParam})
    const [todoData,setTodoData] = useState([]);
    const [todoPage,setTodoPage] = useState({});
    const [spinning,setSpinning] = useState(false);

    useEffect(()=>{
        getTodoList()
    },[params]);

    const getTodoList = () => {
        setSpinning(true)
        getTodoPageService({
            ...params,
            userId: getUser().userId
        }).then(res=>{
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
                pageSize: 20,
                currentPage: page,
            }
        })
    }

    const changeActive = (value,type) => {
        if(value===0 || value==='all'){
            delete params[type]
            setParams({
                ...params,
                pageParam,
            })
        }else {
            setParams({
                ...params,
                [type]:value,
                pageParam
            })
        }
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
                        />
                        <div className={'thoughtware_fulltodo-select'}>
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
