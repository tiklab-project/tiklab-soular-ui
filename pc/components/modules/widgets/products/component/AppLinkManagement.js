/**
 * @name: AppLinkManagement
 * @author: mahai
 * @date: 2021-06-28 16:19
 * @description：工作台-应用链接管理
 * @update: 2021-06-28 16:19
 */
import React, { useState} from 'react';
import { Modal, Row, Col } from 'antd';
import AddWorkBench from './workBenchAdd';
import WorkService from '../api'
import {WORK_NAME} from 'tiklab-widget-ui/es/_utils/constant'
import './applinkMenagement.scss'
const AppLinkManagement = props => {
    const {visibleManagement,setVisibleManagement, applications, requestWorkList} = props;
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(null)



    const deleteWorkByID = async id => {
        const data = await WorkService.deleteWorkByID(id);
        if (!data.code) {
            requestWorkList()
        }
    }

    const callBack = () => {
        setEdit(null)
        requestWorkList()
    }

    // TODO 提交表单
    const handleOk = () => {
        requestWorkList()
        setVisibleManagement(false)
    };
    // TODO 取消提交
    const handleCancel = () => {
        setVisibleManagement(false)
    };

    const editData = (data ) => {
        setEdit(data)
        setVisible(true);
    }

    const showModal = () => {
        setVisible(true);
    };
    return(
        <Modal
            title= "应用链接管理"
            visible={visibleManagement}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            destroyOnClose={true}
            width={720}
        >
            <Row>
                <Col span={24} style={{overflow:'auto'}}>
                    <div className="title">
                       default
                    </div>
                    <div className="box-gather">
                        {
                            applications.map((work) => {
                                return (
                                    <div className="box-item" key={work.id}>
                                        <div className="box-icon management">
                                            {WORK_NAME[work.appType].label}
                                            <div className={'action'}>
                                                <span onClick={() => editData(work)}>编辑</span>
                                                <span onClick={()=>deleteWorkByID(work.id) }>删除</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/*<div className="box-item" onClick={()=>showModal() }>*/}
                        {/*    <div className="box-icon">*/}
                        {/*        <PlusOutlined className={{fontSize: 20}}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </Col>
            </Row>
            <AddWorkBench
                {...props}
                edit={edit}
                visible = {visible}
                setVisible = {setVisible}
                applicationList={applications.map(item => item.appType)}
                callBack={callBack}
            />
        </Modal>
    )
};

export default AppLinkManagement
