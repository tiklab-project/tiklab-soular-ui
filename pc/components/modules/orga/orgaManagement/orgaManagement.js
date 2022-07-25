import React from 'react';
import {OrgaList} from "doublekit-user-ui";


const OrgaManagement = (props) => {

    return(
        <OrgaList
            {...props}
            isPortal={true}
        />
    )
}



export default OrgaManagement
