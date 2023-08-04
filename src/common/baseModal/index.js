/**
 * @name: index
 * @author mahai
 * @date 2022/11/5 1:05 PM
 * @description index
 */
import React from "react";
import {Modal} from "antd";
import Btn from "../btn";
import './style/index.scss';

const BaseModal = ({children, title, width,...res}) => {

    const style = {
        maxWidth: 'calc(100vw - 120px)',
        maxHeight: 'calc(100vh - 120px)',
        marginRight: 'auto',
        marginLeft: 'auto',
        position: 'absolute',
        top: 60,
        right: 0,
        left: 0,
        height:'100%',
        display:"flex",
        flexDirection: 'column'
    }

    const modalFooter = (
        <>
            <Btn onClick={res.onCancel} title={"取消"} isMar={true}/>
            <Btn onClick={res.onOk} title={"确定"} type={"primary"}/>
        </>
    )

    return(
        <Modal
            {...res}
            title={title}
            width={width}
            style={style}
            wrapClassName={'tiklab_modal'}
            closable={false}
            footer={modalFooter}
        >
            {children}
        </Modal>
    )
};
export default BaseModal;
