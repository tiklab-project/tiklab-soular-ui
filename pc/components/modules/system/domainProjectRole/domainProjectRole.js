/**
 * @name: domainProjectRole
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：项目角色管理(自)
 * @update: 2021-05-06 15:19
 */
import React from 'react';
import {inject, observer} from "mobx-react";
import { DomainRoleList, SYSTEM_ROLE_STORE,} from "doublekit-privilege-ui";

const DomainProjectRole = props => {
    return(
        <DomainRoleList {...props} domainId={'111'} />
    )
}
export default inject(SYSTEM_ROLE_STORE)(observer(DomainProjectRole))
