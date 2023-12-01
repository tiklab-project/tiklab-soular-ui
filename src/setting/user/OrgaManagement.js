import React from 'react';
import {Orga} from "tiklab-user-ui";

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
        />
    )
}

export default OrgaManagement
