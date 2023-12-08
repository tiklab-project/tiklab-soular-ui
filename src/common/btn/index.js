import React from "react";
import {Space} from "antd";
import "./style/index.scss";

/**
 * 操作按钮
 */
const Btn = ({icon,type,title,onClick,isMar,children}) =>{

    return (
        <div className={`darth-btn ${type?`darth-btn-${type}`:""} ${isMar?"darth-btn-mar":""}`} onClick={onClick}>
            <Space>
                { icon &&  <span className="darth-btn-icon">{icon}</span> }
                { children ? children:title}
            </Space>
        </div>
    )
}

export default Btn
