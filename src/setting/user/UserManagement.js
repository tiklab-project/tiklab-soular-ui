import React from 'react';
import {User} from "thoughtware-user-ui";

const UserManagement = props => {
    return(
        <User
            {...props}
            isPortal={true}
        />
    )
};

export default UserManagement
