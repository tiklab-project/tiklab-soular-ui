import React, { useState} from 'react';
import { Row, Col } from 'antd';
import BaseModal from "../../common/baseModal";
import AddWorkBench from './ProductsAppLinckAdd';
import {deleteWorkByIDService} from '../store/store'
import {PROJECT_NAME} from '../../utils/constant'
import Btn from '../../common/btn'
import './ProductsAppLink.scss'

/**
 * 工作台-应用链接管理
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ProductsAppLink = props => {

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

    /**
     * 提交表单
     */
    const handleOk = () => {
        setVisibleManagement(false)
    }

    /**
     * 取消提交
     */
    const handleCancel = () => {
        setVisibleManagement(false)
    };

    /**
     * 编辑产品字段
     * @param data
     */
    const editData = (data ) => {
        setEdit(data)
        setVisible(true);
    }

    const modalFooter = (
        <>
            <Btn onClick={handleCancel} title={"取消"} isMar={true}/>
            <Btn onClick={handleOk} title={"确定"} type={"primary"}/>
        </>
    )

    return(
        <BaseModal
            title= "应用链接管理"
            visible={visibleManagement}
            footer={modalFooter}
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
                                            {PROJECT_NAME[work.appType]}
                                            <div className={'action'}>
                                                <span onClick={()=>editData(work)}>编辑</span>
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
                visible={visible}
                setVisible={setVisible}
                requestWorkList={requestWorkList}
            />
        </BaseModal>
    )
};

export default ProductsAppLink
