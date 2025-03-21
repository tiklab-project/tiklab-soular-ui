import React from "react";
import {UserVerify} from "tiklab-eam-ui";
import Portal from "./Portal";
import SettingAside from "./SettingAside";

/**
 * 首页入口
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Layout = props => {
    return (
        <Portal{...props}>
            <SettingAside {...props}/>
        </Portal>
    )
}

export default UserVerify(Layout,"/noAuth")
