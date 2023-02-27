
import React from 'react';
import {User} from "tiklab-user-ui";
const UserManagement = props => {
    return(
        <User
            {...props}
            isPortal={true}
        />
    )
};
export default UserManagement
