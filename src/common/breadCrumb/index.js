import React from "react";
import {Space} from "antd"
import {LeftOutlined} from "@ant-design/icons";
import "./style/index.scss";

/**
 * 面包屑
 */
const BreadCrumb = ({firstItem,secondItem,onClick,children}) =>{

    return  <div className="eas-breadcrumb">
                <Space>
                    <span className={onClick ? "eas-breadcrumb-first":""} onClick={onClick}>
                        {onClick && <LeftOutlined style={{marginRight:8}}/>}
                        <span className={secondItem ? "eas-breadcrumb-span":""}>
                            {firstItem}
                        </span>
                    </span>
                    {secondItem && <span> / &nbsp; {secondItem}</span>}
                </Space>
                <div>{children}</div>
            </div>
}

export default BreadCrumb
