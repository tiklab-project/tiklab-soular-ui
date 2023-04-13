import React, { useState} from 'react';
import { Row, Col } from 'antd';
import BaseModal from "../../../../common/baseModal";
import AddWorkBench from './workBenchAdd';
import {deleteWorkByIDService} from '../api'
import {WORK_NAME} from '../../../../utils/constant'
import './applinkMenagement.scss'

/**
 * 工作台-应用链接管理
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AppLinkManagement = props => {
    const {visibleManagement,setVisibleManagement, applications, requestWorkList} = props;
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(null)

    /**
     * 删除
     * @param id
     * @returns {Promise<void>}
     */
    const deleteWorkByID = async id => {
        const data = await deleteWorkByIDService(id);
        if (!data.code) {
            requestWorkList()
        }
    }

    // TODO 提交表单
    const handleOk = () => {
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

    return(
        <BaseModal
            title= "应用链接管理"
            visible={visibleManagement}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={"确定"}
            cancelText={"取消"}
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
                requestWorkList={ requestWorkList}
            />
        </BaseModal>
    )
};

export default AppLinkManagement
