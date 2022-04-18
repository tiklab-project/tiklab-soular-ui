import React from 'react';
import {OrgList} from "doublekit-user-ui";


const OrgaManagement = (props) => {

    return(
        <div>
            <OrgList
                {...props}
                isPortal={true}
            />
        </div>
    )
}



export default OrgaManagement
