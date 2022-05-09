/**
 * @name: projectuser
 * @author: mahai
 * @date: 2021-10-12 10:56
 * @description：projectuser
 * @update: 2021-10-12 10:56
 */
import React from 'react';
import {SYSTEM_ROLE_STORE} from "doublekit-privilege-ui";
import {PrivilegeDomainUser} from "doublekit-user-ui";
import {inject, observer} from "mobx-react";


const ProjectUser = props => {

    return(
        <PrivilegeDomainUser {...props} domainId={'111'}/>
    )
}

export default inject(SYSTEM_ROLE_STORE)(observer(ProjectUser))
