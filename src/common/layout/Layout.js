import React from "react";
import {UserVerify} from "thoughtware-eam-ui";
import Portal from "./Portal";

/**
 * 首页入口
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Layout = props => {
    return (
        <Portal
            {...props}
        />
    )
}

export default UserVerify(Layout,"/no-auth")
