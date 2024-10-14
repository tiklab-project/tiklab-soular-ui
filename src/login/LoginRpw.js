import React from 'react';
import {LoginRpw} from "tiklab-eam-ui";

const PortalLoginRpw  = props => {

    return (
        <LoginRpw
            {...props}
            loginGoRouter='/'
        />
    )
}

export default PortalLoginRpw
