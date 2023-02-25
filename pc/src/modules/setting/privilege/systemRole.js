/**
 * @name: systemRole
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：系统角色
 * @update: 2021-05-06 15:19
 */

import React from 'react';
import {SystemRole} from "tiklab-privilege-ui";
const SystemRolePage = props => {

    return(
        <SystemRole {...props} group={'system'}/>
    )
}

export default SystemRolePage


