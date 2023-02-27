import React from 'react';
import {Orga} from "tiklab-user-ui";
// import {OrgaList} from "../../../../../src/components";

const OrgaManagement = (props) => {

    return(
        <Orga
            {...props}
            isPortal={true}
        />
    )
}



export default OrgaManagement
