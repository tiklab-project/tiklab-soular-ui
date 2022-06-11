import React from 'react';
import {OrgList} from "doublekit-user-ui";


const OrgaManagement = (props) => {

    return(
        <OrgList
            {...props}
            isPortal={true}
        />
    )
}



export default OrgaManagement
