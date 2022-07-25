/**
 * @name: systemRole
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：系统角色
 * @update: 2021-05-06 15:19
 */

import React from 'react';
import {SystemRoleList} from "doublekit-privilege-ui";

const SystemRole = props => {

    return(
        <SystemRoleList {...props} group={'system'} tableLink={'/privilege/role/system/'}/>
    )
}

export default SystemRole


