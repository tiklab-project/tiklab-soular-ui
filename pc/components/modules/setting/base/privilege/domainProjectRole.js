/**
 * @name: domainProjectRole
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：项目角色管理(自)
 * @update: 2021-05-06 15:19
 */
import React from 'react';
import { DomainRoleList} from "tiklab-privilege-ui";

const DomainProjectRole = props => {
    return(
        <DomainRoleList {...props} domainId={'111'} />
    )
}
export default DomainProjectRole
