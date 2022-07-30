import React from 'react';
import {OrgaList} from "tiklab-user-ui";


const OrgaManagement = (props) => {

    return(
        <OrgaList
            {...props}
            isPortal={true}
        />
    )
}



export default OrgaManagement
