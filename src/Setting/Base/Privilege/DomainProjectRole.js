/**
 * @name: domainProjectRole
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：项目角色管理(自)
 * @update: 2021-05-06 15:19
 */
import React from 'react';
import { DomainRole} from "tiklab-user-ui";

const DomainProjectRole = props => {
    return(
        <DomainRole {...props} domainId={'111'} />
    )
}
export default DomainProjectRole
