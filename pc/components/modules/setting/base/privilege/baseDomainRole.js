

/**
 * @name: baseSystemFeature
 * @author mahai
 * @date 2022/10/28 1:07 PM
 * @description baseSystemFeature
 */
import React from 'react';
import {DomainRoleList} from "tiklab-privilege-ui";

const BaseSystemRole = () => {

    return(
        <DomainRoleList isBase={true} domainId={"1234"}/>
    )
}
export default BaseSystemRole