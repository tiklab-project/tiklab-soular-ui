import React from "react";
import {NoAccess} from "tiklab-privilege-ui";

/**
 * 当前页面没有访问权限
 * @param props
 * @returns {Element}
 * @constructor
 */
const NoAccessContent = props =>{

    return (
        <NoAccess
            {...props}
            homePath={'/'}
        />
    )

}

export default NoAccessContent
