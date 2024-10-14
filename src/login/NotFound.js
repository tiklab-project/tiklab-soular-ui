import React from "react";
import {NotFound} from "tiklab-eam-ui";

/**
 * 微信登录入口
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const NotFoundContent = props =>{

    return (
        <NotFound
            {...props}
            homePath={'/'}
        />
    )

}

export default NotFoundContent
