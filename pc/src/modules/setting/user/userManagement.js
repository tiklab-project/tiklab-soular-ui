
import React from 'react';
import {UserList} from "tiklab-user-ui";
const UserManagement = props => {
    return(
        <UserList
            {...props}
            isPortal={true}
        />
    )
};
export default UserManagement
