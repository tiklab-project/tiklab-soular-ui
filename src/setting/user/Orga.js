import React from 'react';
import {Orga} from "tiklab-user-ui";

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
            bgroup={"soular"}
        />
    )
}

export default OrgaContent
