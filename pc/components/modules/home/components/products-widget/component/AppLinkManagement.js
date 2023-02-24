/**
 * @name: AppLinkManagement
 * @author: mahai
 * @date: 2021-06-28 16:19
 * @description：工作台-应用链接管理
 * @update: 2021-06-28 16:19
 */
import React, { useState} from 'react';
import { Row, Col } from 'antd';
import BaseModal from "../../../../common/base-modal";
import AddWorkBench from './workBenchAdd';
import {deleteWorkByIDService} from '../api'
import {WORK_NAME} from '../../_utils/constant'
import './applinkMenagement.scss'
const AppLinkManagement = props => {
    const {visibleManagement,setVisibleManagement, applications, requestWorkList} = props;
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(null)



    const deleteWorkByID = async id => {
        const data = await deleteWorkByIDService(id);
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
        <BaseModal
            title= "应用链接管理"
            visible={visibleManagement}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose={true}
            width={720}
        >
            <Row className={'applink'}>
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
        </BaseModal>
    )
};

export default AppLinkManagement
