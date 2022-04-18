/**
 * @name: work
 * @author: mahai
 * @date: 2021-05-24 09:38
 * @description：work
 * @update: 2021-05-24 09:38
 */
import React, {useState, useEffect}  from 'react';
import {getUser} from 'doublekit-core-ui'
import WorkService from './service/workService'
import { Col, Row } from 'antd';
import "./components/workBench.scss"
import AppLinkManagement from './components/AppLinkManagement';

const WORK_NAME = {
    apibox: {
        label: 'API BOX',
    },
    project: {
        label: '项目管理',
    },
};

const Work = (props) => {
    const [urls, setUrls] = useState([]);
    const [visibleManagement, setVisibleManagement] = useState(false);

    const user = getUser();
    useEffect(() => {
        getWorkList().then(r => {})
    }, [])

    const showManage = id => {
        setVisibleManagement(true)
    }

    const requestWorkList = () =>{
        getWorkList().then(r => {})
    }

    const getWorkList = async () => {
        const data = await WorkService.getWorkList();
        setUrls(data)
    }

    return (
        <>
            <Row justify={'center'} style={{width:'100%',}}>
                <Col xl={{span:24}} xxl={{span:16}}>
                    <div className="title">
                        default
                        <span className={'head-action'} onClick={()=> showManage() }>管理</span>
                    </div>
                    <div className="box-gather">
                        {
                            urls.map(item => {
                                const url = user.ticket ? `${item.appUrl}?email=${user.email}&name=${user.name}&expireTime=${user.expireTime}&ticket=${user.ticket}&phone=${user.phone}&userId=${user.userId}` : item.appUrl
                                return (
                                    <div className="box-item" key={item.id}>
                                        <div className="box-icon">
                                            <a href={url} target='_blank'> {WORK_NAME[item.appType].label}</a>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </Col>
            </Row>
            {
                urls.length === 0 && <Row justify={'center'} style={{width:'100%',}}>
                    <Col xl={{span:24}} xxl={{span:16}}>
                        <div className="title">
                            default
                            <span className={'head-action'} onClick={()=> showManage('') }>管理</span>
                        </div>
                        <div className="box-gather">

                        </div>
                    </Col>
                </Row>
            }
            <AppLinkManagement
                {...props}
                workList={urls}
                requestWorkList={requestWorkList}
                visibleManagement = {visibleManagement}
                setVisibleManagement = {setVisibleManagement}
            />
        </>
    )
}
export default Work
