import React from "react";
import {SystemRole} from "thoughtware-privilege-ui";

/**
 * 系统权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SystemRoleTrue = props =>{

    return <SystemRole {...props} bgroup={"eas"} isBase={true}/>

}

export default SystemRoleTrue
