import React from 'react';
import {Orga} from "thoughtware-user-ui";

/**
 * 部门
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const OrgaContent = (props) => {

    return(
        <Orga
            {...props}
            isPortal={true}
            bgroup={"eas"}
        />
    )
}

export default OrgaContent
