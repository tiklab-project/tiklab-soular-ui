import React, {useState, useEffect} from "react";
import {DatePicker, Row, Col, Space, Spin} from "antd";
import {productSelect} from 'tiklab-core-ui';
import moment from 'moment';
import {findLogPageByTime,findlogtypelist} from "../store/HomeStore";
import Page from '../../common/page/Page'
import BreadCrumb from "../../common/breadCrumb/BreadCrumb";
import SearchSelect from "../../common/search/SearchSelect";
import SearchPicker from "../../common/search/SearchPicker";
import DynamicList from "../../common/list/DynamicList";
import './Oplog.scss'

const { RangePicker } = DatePicker;

const pageSize = 10;

/**
 * 日志
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Oplog = props => {

    const {setShowOplog} = props

    const pageParam = {
        pageSize: pageSize,
        currentPage: 1,
    }

    //日志参数
    const [params,setParams] = useState({pageParam})
    //日志数据
    const [logData,setLogData] = useState([]);
    //日志分页
    const [logPage,setLogPage] = useState({});
    //加载状态
    const [spinning,setSpinning] = useState(false);
    //日志类型
    const [logType,setLogType] = useState([]);

    useEffect(() => {
        findlogtypelist().then(res=>{
            if (res.code === 0 ) {
                const oplogTypes = res?.data.map(item => ({
                    value: item.id,
                    label: item.name,
                }))
                setLogType(oplogTypes);
            }
        })
    }, []);

    useEffect(()=>{
        // 获取日志
        getOplogPage()
    },[params]);

    /**
     * 获取日志
     */
    const getOplogPage = () => {
        setSpinning(true)
        findLogPageByTime(params).then(res=>{
            if (res.code === 0 ) {
                setLogData(res.data.dataList);
                setLogPage({
                    totalPage:res.data.totalPage,
                    totalRecord:res.data.totalRecord
                })
            }
            setSpinning(false)
        })
    }

    /**
     * 模糊搜索日志
     */
    const onChangeProduct = (value,type) => {
        if (value === 'all') {
            delete params[type]
            setParams({
                ...params
            })
        } else {
            setParams( {
                ...params,
                pageParam,
                [type]: value
            })
        }
    }

    /**
     * 模糊搜索日志
     */
    const OnSelectTime = (times) => {
        let newParams = {}
        if (times) {
            const start = moment(times[0]).format('YYYY-MM-DD') + ' 00:00:00';
            const end = moment(times[1]).format('YYYY-MM-DD') + ' 23:59:59';
            newParams = {
                ...params,
                pageParam,
                timestamp:[start,end]
            }
        } else {
            const {createTime, ...rest} = params
            newParams = {
                ...rest,
                pageParam
            }
        }
        setParams(newParams)
    };

    const changPage = page => {
        setParams({
            ...params,
            pageParam: {
                pageSize: pageSize,
                currentPage: page,
            }
        })
    }

    return(
        <Row className={'tiklab_fulloplog'}>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "16", offset: "4" }}
                xxl={{ span: "14", offset: "5" }}
            >
                <Spin spinning={spinning}>
                    <div className="soular-home-limited">
                        <BreadCrumb
                            firstItem={'动态'}
                            onClick={setShowOplog ? ()=>setShowOplog(false) :undefined}
                        />
                        <Space className='tiklab_fulloplog_select'>
                            <SearchSelect
                                options={[
                                    {label: "全部应用", value: 'all'},
                                    ...productSelect
                                ]}
                                value={params?.bgroup}
                                placeholder={'应用'}
                                onChange={value=>onChangeProduct(value,'bgroup')}
                                style={{width:150}}
                            />
                            <SearchSelect
                                options={[
                                    {value:'all',label:'全部'},
                                    ...logType
                                ]}
                                value={params?.actionType}
                                placeholder={'类型'}
                                onChange={value=>onChangeProduct(value,'actionType')}
                                style={{width:150}}
                            />
                            <SearchPicker
                                onChange={OnSelectTime}
                                placeholder={["开始时间", "结束时间"]}
                            />
                        </Space>
                        <div className={'tab-content'}>
                            <DynamicList dynamicList={logData}/>
                            <Page
                                currentPage={params.pageParam.currentPage}
                                changPage={changPage}
                                page={logPage}
                            />
                        </div>
                    </div>
                </Spin>
            </Col>
        </Row>

    )
};
export default Oplog
