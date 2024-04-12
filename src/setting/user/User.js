import React from 'react';
import {User} from "thoughtware-user-ui";

const UserContent = props => {
    return(
        <User
            {...props}
            isPortal={true}
            bgroup={"eas"}
        />
    )
};

export default UserContent
