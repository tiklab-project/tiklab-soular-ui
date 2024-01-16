import React from "react";
import {Space} from "antd";
import "./Btn.scss";

/**
 * 操作按钮
 */
const Btn = ({icon,type,title,onClick,isMar,children}) =>{

    return (
        <div className={`eas-btn ${type?`eas-btn-${type}`:""} ${isMar?"eas-btn-mar":""}`} onClick={onClick}>
            <Space>
                { icon &&  <span className="eas-btn-icon">{icon}</span> }
                { children ? children:title}
            </Space>
        </div>
    )
}

export default Btn
