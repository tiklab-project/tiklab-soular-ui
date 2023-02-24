import React from 'react';
import {OrgaList} from "tiklab-user-ui";
// import {OrgaList} from "../../../../../src/components";

const OrgaManagement = (props) => {

    return(
        <OrgaList
            {...props}
            isPortal={true}
        />
    )
}



export default OrgaManagement
