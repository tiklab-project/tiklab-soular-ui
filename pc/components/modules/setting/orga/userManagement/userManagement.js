
import React from 'react';
import {UserList, DomainUserList} from "tiklab-user-ui";
const UserManagement = props => {
    return(
        <UserList
            {...props}
            isPortal={true}
        />
    )
};
export default UserManagement
