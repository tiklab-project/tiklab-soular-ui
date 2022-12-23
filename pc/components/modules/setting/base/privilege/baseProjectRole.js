
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
        <ProjectRoleList isBase={true} domainId={'1111'}/>
    )
}

export default BaseProjectRole;
