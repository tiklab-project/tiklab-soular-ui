
import React from 'react';
import {UserList} from "doublekit-user-ui";
const UserManagement = props => {
    return(
        <UserList
            {...props}
            isPortal={true}
            domainId={'111'}
            addUserPromiseCode={'111'}
            exportUserPromiseCode={'222'}
        />
    )
};
export default UserManagement
