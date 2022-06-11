/**
 * @name: systemRole
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：系统角色
 * @update: 2021-05-06 15:19
 */

import React from 'react';
import {inject, observer} from "mobx-react";
import {RoleList, SYSTEM_ROLE_STORE} from "doublekit-privilege-ui";

const SystemRole = props => {

    return(
        <RoleList {...props} group={'system'} tableLink={'/privilege/role/system/'}/>
    )
}

export default inject(SYSTEM_ROLE_STORE)(observer(SystemRole))


