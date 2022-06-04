
import React from 'react';

import {UserList} from "doublekit-user-ui";

const UserManagement = props => {
    return(
        <div style={{height:'100%', overflow:"auto"}}>
            <UserList
                {...props}
                isPortal={true}
                domainId={'111'}
                addUserPromiseCode={'111'}
                exportUserPromiseCode={'222'}
            />
        </div>
    )
};
export default UserManagement
