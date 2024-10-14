import React from 'react';
import {User} from "tiklab-user-ui";

const UserContent = props => {
    return(
        <User
            {...props}
            isPortal={true}
            bgroup={"soular"}
        />
    )
};

export default UserContent
