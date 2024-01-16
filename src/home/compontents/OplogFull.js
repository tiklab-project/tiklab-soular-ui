import React, {useState, useEffect} from "react";
import { DatePicker,Row,Col} from "antd";
import {applyJump, getUser} from 'thoughtware-core-ui';
import moment from 'moment';
import {getOplogPageService} from "../store/store";
import Page from '../../common/page/Page'
import BreadCrumb from "../../common/breadCrumb/BreadCrumb";
import DynamicList from "../../common/list/DynamicList";
import './OplogFull.scss';

const { RangePicker } = DatePicker;

/**
 * 日志
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const OplogFull = props => {

    const [pageParam] = useState({
        pageSize: 20,
        currentPage: 1,
    })

    const [params,setParams] = useState({pageParam})
    const [logData,setLogData] = useState([]);
    const [logPage,setLogPage] = useState({})

    useEffect(()=>{
        // 获取日志
        getOplogPage()
    },[params]);

    /**
     * 获取日志
     */
    const getOplogPage = () => {
        getOplogPageService({
            ...params,
            userId: getUser().userId,
            bgroup:'eas'
        }).then(res=>{
            if (res.code === 0 ) {
                const data = res.data.dataList;
                setLogData(data);
                setLogPage({
                    totalPage:res.data.totalPage,
                    totalRerocd:res.data.totalRerocd
                })
            }
        })
    }

    /**
     * 模糊搜索日志
     * @param times：时间
     */
    const OnSelectTime = (times) => {
        let newParams = {}
        if (times) {
            const start = moment(times[0]).format('YYYY-MM-DD') + ' 00:00:00';
            const end = moment(times[1]).format('YYYY-MM-DD') + ' 23:59:59';
            newParams = {
                ...params,
                pageParam,
                createTime:[start,end]
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
                pageSize: 20,
                currentPage: page,
            }
        })
    }

    const onDetail = (item) => {
        const {link} = item;
        if (link && /^http|https/.test(link)) {
            applyJump(link)
        }
    }

    return(
        <Row className='thoughtware_fulloplog'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "16", offset: "4" }}
                xxl={{ span: "14", offset: "5" }}
            >
                <div className='eas-home-limited'>
                    <div className='thoughtware_fulloplog-title'>
                        <BreadCrumb
                            firstItem={"动态"}
                        />
                    </div>
                    <div className='thoughtware_fulloplog_select'>
                        <RangePicker
                            onChange={OnSelectTime}
                            placeholder={["开始时间", "结束时间"]}
                        />
                    </div>
                    <div className={'tab-content'}>
                        <DynamicList dynamicList={logData}/>
                        <Page
                            currentPage={params.pageParam.currentPage}
                            changPage={changPage}
                            page={logPage}
                        />
                    </div>
                </div>
            </Col>
        </Row>

    )
};
export default OplogFull
