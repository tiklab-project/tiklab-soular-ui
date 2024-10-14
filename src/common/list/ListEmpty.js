import React from "react";
import {Empty} from "antd";

/**
 * 暂无数据
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ListEmpty = props =>{

    const {title} = props

    return (
        <Empty
            description={title ? title : "没有查询到数据"}
        />
    )

}

export default ListEmpty
