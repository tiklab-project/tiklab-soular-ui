
import React from 'react';
import {SYSTEM_ROLE_STORE} from "doublekit-privilege-ui";
import {DomainUserList} from "doublekit-user-ui";
import {inject, observer} from "mobx-react";

const ProjectPeopleManagement = props => {
    return(
        <div>
            <DomainUserList {...props} domainId={'111'} isPortal={true}/>
        </div>
    )
};

export default inject(SYSTEM_ROLE_STORE)(observer(ProjectPeopleManagement))
