
/**
 * @name: baseSystemFeature
 * @author mahai
 * @date 2022/10/28 1:07 PM
 * @description baseSystemFeature
 */
import React from 'react';
import {ProjectRoleList, DomainRoleList} from "tiklab-privilege-ui";

const BaseProjectRole = () => {

    return(
        <DomainRoleList isBase={false} domainId={'1111'}/>
    )
}

export default BaseProjectRole;
