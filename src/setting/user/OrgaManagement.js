import React from 'react';
import {Orga} from "thoughtware-user-ui";

/**
 * 部门
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const OrgaManagement = (props) => {

    return(
        <Orga
            {...props}
            isPortal={true}
            bgroup={"eas"}
        />
    )
}

export default OrgaManagement
