
import React from 'react';
import {SYSTEM_ROLE_STORE} from "tiklab-privilege-ui";
import {DomainUserList} from "tiklab-user-ui";
import {inject, observer} from "mobx-react";

const ProjectPeopleManagement = props => {
    return(
        <DomainUserList {...props} domainId={'111'} isPortal={true}/>
    )
};

export default inject(SYSTEM_ROLE_STORE)(observer(ProjectPeopleManagement))
